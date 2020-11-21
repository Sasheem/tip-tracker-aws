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

import { listShifts } from '../graphql/queries';
import CalendarDetail from '../components/calendarDetail';
/**
 * todo Fix app so shift data shows up when you switch to the tab
 * 		? currently I need to navigate to another month and back
 * 		? again to see the shift data
 */

const ViewCalendar = () => {
	const [shifts, setShifts] = useState([]);
	const [currentDetail, setCurrentDetail] = useState({});

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		console.log(`fetching shifts`);
		getShifts();
	}, []);

	// helper function - fetch shifts
	const getShifts = async () => {
		const result = await API.graphql(graphqlOperation(listShifts));
		setShifts(result.data.listShifts.items);
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
			results.map((item) => {
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
								textAlign: 'center',
								color: state === 'disabled' ? 'gray' : 'black',
							}}
						>
							{date.day}
						</Text>
						{amount !== 0.0 && (
							<Text style={{ textAlign: `center` }}>${amount.toFixed(0)}</Text>
						)}
						{amount !== 0.0 && hours !== 0.0 && (
							<Text style={{ textAlign: `center` }}>
								{hourly.toFixed(1)}/hr
							</Text>
						)}
					</TouchableOpacity>
				</View>
			);
		}

		return (
			<View>
				<Text
					style={{
						textAlign: 'center',
						color: state === 'disabled' ? 'gray' : 'black',
					}}
				>
					{date.day}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* Calendar Component */}
			{shifts.length !== 0 ? (
				<Calendar
					showWeekNumbers
					hideExtraDays
					firstDay={1}
					style={{}}
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
			<CalendarDetail currentDetail={currentDetail} />
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
});

export default ViewCalendar;
