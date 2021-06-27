import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	useColorScheme
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CalendarDetail from '../components/calendarDetail';
import { Context as ShiftsContext } from '../context/ShiftsContext';
import { Context as JobsContext } from '../context/JobsContext';
/**
 * todo Fix app so shift data shows up when you switch to the tab
 * 		? currently I need to navigate to another month and back
 * 		? again to see the shift data
 */

const ViewCalendar = ({ navigation }) => {
	// context
	const { state: fetchedShifts, getShifts } = useContext(ShiftsContext);
	const { state: fetchedJobs, getJobs } = useContext(JobsContext);

	// state
	const [currentDetail, setCurrentDetail] = useState({});
	const [currentDate, setCurrentDate] = useState('');
	const [dailyGoal, setDailyGoal] = useState('0');
	const [colorScheme] = useState(useColorScheme());

	// set up theme colors
	const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
	const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
	const themeBorderStyle = colorScheme === 'light' ? styles.lightThemeBorder : styles.darkThemeBorder;
	console.log(`Color Scheme: ${colorScheme}`);

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		console.log(`fetching shifts`);
		getShifts();
		console.log(`fetching jobs`);
		getJobs();
		fetchSettings();
		// listen for when this component ViewCalendar gains focus or
        // becomes the primary component on the screen
		const unsubscribe = navigation.addListener('tabPress', e => {
			console.log(`tab pressed getting shifts`);
			getShifts();
		})
		
		// clean up
        // tell react-navigation we don't need to listen anymore
		return unsubscribe;
	}, []);

	useEffect(() => {
		// listen for when this component ViewCalendar gains focus or
        // becomes the primary component on the screen
		const unsubscribe = navigation.addListener('tabPress', e => {
			console.log(`tab pressed getting shifts`);
			getShifts();
		})

		// clean up
        // tell react-navigation we don't need to listen anymore
		return unsubscribe;
	}, [navigation])

	// helper function - fetch local storage settings
    const fetchSettings = async () => {
        // fetch settings
        let daily = await AsyncStorage.getItem('@Settings_dailyGoal');
        daily !== undefined ? setDailyGoal(daily) : console.log('No saved daily to load');
    }

	// helper function - handle state for empty cell selected
	const handleEmptyDaySelected = (date) => {
		setCurrentDetail({});
		setCurrentDate(moment(date.dateString, 'YYYY-MM-DD').format('L'));
		console.log(`changing current date to ${date.dateString}`);
	};

	// renderDayComponent - find all shifts for each day and render amount + hourly
	const renderDayComponent = (date, state) => {
		var amount = 0.0;
		var hours = 0.0;
		var hourly = 0.0;

		const results = fetchedShifts.filter(
			(shift) =>
				date.dateString ===
				moment(shift.createdAt, 'MM-DD-YYYY').format('YYYY-MM-DD')
		);

		if (results.length !== 0) {
			_.map(results, (item) => {
				if (item.amount !== '') {
					amount += parseFloat(item.amount);
				}
				if (item.hours !== '') {
					hours += parseFloat(item.hours);
				}
				if (item.job !== '') {
					// check for hourly
					let job = _.find(fetchedJobs, j => j.id === item.job);

					// check if wage is higher than minimum - default FL
					if (job !== undefined && job.jobWage > 8.65) {
						let hourlyWage = parseFloat(item.hours) * job.jobWage;
						amount += hourlyWage;
						console.log(`hourlyWage: ${hourlyWage}`);
					}
				}
				
			});
			hourly = amount / hours;

			return (
				<View>
					<TouchableOpacity onPress={() => setCurrentDetail({ ...results })}>
						<View style={{
							alignSelf: `flex-start`,
							paddingTop: 2,
							paddingLeft: 5,
							paddingRight: 5,
							paddingBottom: 2,
							backgroundColor: parseInt(dailyGoal) > hourly ? `white` : `rgba(57,160,237,.2)`,
							borderRadius: 20, 
						}}>
							<Text
								style={{
									textAlign: 'left',
									color: state === 'disabled' ? 'gray' : colorScheme === 'light' ? `#242c40` : `#BABAB4`,
									
								}}
							>
								{date.day}
							</Text>
						</View>
						{amount !== 0.0 && (
							<Text style={[styles.cellText, themeTextStyle]}>${amount.toFixed(0)}</Text>
						)}
						{amount !== 0.0 && hours !== 0.0 && (
							<Text style={[styles.cellText, themeTextStyle]}>{hourly.toFixed(1)}/hr</Text>
						)}
					</TouchableOpacity>
				</View>
			);
		}

		return (
			<TouchableOpacity onPress={() => handleEmptyDaySelected(date)}>
				<View style={{ height: 35, width: 35 }}>
					<Text
						style={{
							textAlign: 'left',
							color: state === 'disabled' ? 'gray' : 'black',
						}}
					>
						{date.day}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{/* Calendar Component */}
			{!_.isEmpty(fetchedShifts) ? (
				<Calendar
					showWeekNumbers
					hideExtraDays
					style={{}}
					theme={{
						arrowColor: '#39A0ED',
						dayTextColor: colorScheme === 'light' ? `#242c40` : `#BABAB4`,
						monthTextColor: colorScheme === 'light' ? `#242c40` : `#BABAB4`,
						'stylesheet.calendar.header': {
							week: {
								marginTop: 30,
								marginHorizontal: 12,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}
						  },
						  'stylesheet.calendar.main': {
							  week: {
								marginTop: 7,
								marginBottom: 7,
								flexDirection: 'row',
								justifyContent: 'space-around',
								color: colorScheme === 'light' ? `#242c40` : `#BABAB4`
							  }
						  }
					}}
					dayComponent={({ date, state }) => renderDayComponent(date, state)}
					// markedDates={markedDates}
				/>
			) : (
				<View style={[styles.activityContainer, styles.activityHorizontal]}>
					<ActivityIndicator size='large' color='#39A0ED' />
				</View>
			)}

			{/* Calendar Detail */}
			<CalendarDetail
				currentDetail={currentDetail}
				jobs={fetchedJobs}
				currentDate={currentDate}
				navigation={navigation}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: `100%`,
		width: `100%`,
	},
	activityContainer: {
		flex: 1,
		justifyContent: `center`,
	},
	activityHorizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
	cellText: {
		fontSize: 11,
		textAlign: `center`,
	},
	headerText: {
		fontSize: 40,
		paddingLeft: 24,
		paddingTop: 48,
		paddingBottom: 24,
		textAlign: `left`,
	},
	lightContainer: {
		backgroundColor: `white`,
	},
	darkContainer: {
		backgroundColor: `#242c40`
	},
	lightThemeBorder: {
		borderColor: `#242c40`,
	},
	darkThemeBorder: {
		borderColor: `#d0d0c0`,
	},
	lightThemeText: {
		color: `#242c40`,
	},
	darkThemeText: {
		color: '#d0d0c0',
	},
});

export default ViewCalendar;
