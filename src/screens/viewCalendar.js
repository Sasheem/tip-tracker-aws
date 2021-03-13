import React, { useState, useEffect } from 'react';
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

import { listShifts, listJobs } from '../graphql/queries';
import {
	onCreateShift,
	onDeleteShift,
	onUpdateShift,
} from '../graphql/subscriptions';
import CalendarDetail from '../components/calendarDetail';
/**
 * todo Fix app so shift data shows up when you switch to the tab
 * 		? currently I need to navigate to another month and back
 * 		? again to see the shift data
 */

const ViewCalendar = ({ navigation }) => {
	const [shifts, setShifts] = useState([]);
	const [jobs, setJobs] = useState([]);
	const [currentDetail, setCurrentDetail] = useState({});
	const [currentDate, setCurrentDate] = useState('');

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		console.log(`fetching shifts`);
		getShifts();
		console.log(`fetching jobs`);
		getJobs();
	}, []);

	// onCreateSubscription - Listener
	useEffect(() => {
		const onCreateSubscription = API.graphql(
			graphqlOperation(onCreateShift)
		).subscribe({
			// error: (err) => console.log('error caught', err),
			error: (err) => {},
			next: (shiftData) => {
				const newShift = shiftData.value.data.onCreateShift;
				console.log(`newShift: ${JSON.stringify(newShift)}`);
				const prevShifts = shifts.filter((shift) => shift.id !== newShift.id);
				console.log(`prevShifts.length: ${prevShifts.length}`);
				setShifts([...prevShifts, newShift]);
			},
		});
		return () => {
			if (onCreateSubscription) {
				onCreateSubscription.unsubscribe();
			}
		};
	}, [shifts]);

	// onDeleteSubscription - Listener
	useEffect(() => {
		const onDeleteSubscription = API.graphql(
			graphqlOperation(onDeleteShift)
		).subscribe({
			// error: (err) => console.log('error caught', err),
			error: (err) => {},
			next: (shiftData) => {
				const deletedShift = shiftData.value.data.onDeleteShift;
				const updatedShifts = _.filter(
					shifts,
					(shift) => shift.id !== deletedShift.id
				);
				setShifts(updatedShifts);
			},
		});

		return () => {
			if (onDeleteSubscription) {
				onDeleteSubscription.unsubscribe();
			}
		};
	}, [shifts]);

	// helper function - fetch shifts
	const getShifts = async () => {
		const result = await API.graphql(graphqlOperation(listShifts));
		setShifts(result.data.listShifts.items);
	};

	// helper function - fetch jobs
	const getJobs = async () => {
		const result = await API.graphql(graphqlOperation(listJobs));
		setJobs(result.data.listJobs.items);
	};

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

		const results = shifts.filter(
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
				<View>
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
			<Text style={styles.headerText}>View shifts</Text>
			{/* Calendar Component */}
			{shifts.length !== 0 ? (
				<Calendar
					showWeekNumbers
					hideExtraDays
					style={{}}
					theme={{
						arrowColor: '#06D6A0',
					}}
					dayComponent={({ date, state }) => {
						return renderDayComponent(date, state);
					}}
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
