import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { listJobs } from '../graphql/queries';
import CalendarDetail from '../components/calendarDetail';
import { Context as ShiftsContext } from '../context/ShiftsContext';
/**
 * todo Fix app so shift data shows up when you switch to the tab
 * 		? currently I need to navigate to another month and back
 * 		? again to see the shift data
 */

const ViewCalendar = ({ navigation }) => {
	const { state: fetchedShifts, getShifts } = useContext(ShiftsContext);
	const [jobs, setJobs] = useState([]);
	const [currentDetail, setCurrentDetail] = useState({});
	const [currentDate, setCurrentDate] = useState('');
	const [dailyGoal, setDailyGoal] = useState('0');

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

	// helper function - fetch jobs
	const getJobs = async () => {
		const result = await API.graphql(graphqlOperation(listJobs));
		setJobs(result.data.listJobs.items);
	};

	// helper function - fetch local storage settings
    const fetchSettings = async () => {
        // fetch settings
        let daily = await AsyncStorage.getItem('@Settings_dailyGoal');
        daily !== undefined ? setDailyGoal(daily) : console.log('No saved daily to load');
    }

	// helper function - handle state for full cell selected
	const handleFullDaySelected = (currentDetail, date) => {
		setCurrentDetail({ ...currentDetail });
		setCurrentDate(`${date.month}-${date.day}-${date.year}`);
	};

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
			});
			hourly = amount / hours;

			return (
				<View style={{ backgroundColor: parseInt(dailyGoal) > hourly ? `white` : `rgba(6,214,160,.2)`}}>
					<TouchableOpacity onPress={() => setCurrentDetail({ ...results })}>
						<Text
							style={{
								textAlign: 'left',
								color: state === 'disabled' ? 'gray' : 'black',
							}}
						>
							{date.day}
						</Text>
						{amount !== 0.0 && (
							<Text style={styles.cellText}>${amount.toFixed(0)}</Text>
						)}
						{amount !== 0.0 && hours !== 0.0 && (
							<Text style={styles.cellText}>{hourly.toFixed(1)}/hr</Text>
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
						arrowColor: '#06D6A0',
					}}
					dayComponent={({ date, state }) => renderDayComponent(date, state)}
				/>
			) : (
				<View style={[styles.activityContainer, styles.activityHorizontal]}>
					<ActivityIndicator size='large' color='#00ff00' />
				</View>
			)}

			{/* Calendar Detail */}
			<CalendarDetail
				currentDetail={currentDetail}
				jobs={jobs}
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
});

export default ViewCalendar;
