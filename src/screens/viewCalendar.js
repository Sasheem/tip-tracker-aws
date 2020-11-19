import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

import { listShifts } from '../graphql/queries';

/**
 * todo Fix app so shift data shows up when you switch to the tab
 * 		? currently I need to navigate to another month and back
 * 		? again to see the shift data
 */

const ViewCalendar = () => {
	const [shifts, setShifts] = useState([]);

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		getShifts();
	}, [shifts]);

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
		}

		console.log(`RESULT FOR ${date.dateString} =>`);
		console.log(results);

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
				{amount !== 0.0 && (
					<Text style={{ textAlign: `center` }}>${amount.toFixed(0)}</Text>
				)}
				{amount !== 0.0 && hours !== 0.0 && (
					<Text style={{ textAlign: `center` }}>{hourly.toFixed(1)}/hr</Text>
				)}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* Calendar Component */}
			<Calendar
				showWeekNumbers
				hideExtraDays
				firstDay={1}
				style={{}}
				dayComponent={({ date, state }) => {
					return renderDayComponent(date, state);
				}}
			/>

			{/* Calendar Detail */}
			<View style={styles.detailerContainer}>
				<View style={styles.header}></View>
				<View style={styles.body}>
					<View style={styles.nav}>
						<AntDesign name='left' size={28} color='black' />
					</View>
					<View style={styles.content}>
						<View style={styles.topRow}>{/* Earnings, Hours, Hourly */}</View>

						<View style={styles.bottomRow}>{/* Position, Tags */}</View>
					</View>
					<View style={styles.nav}>
						<AntDesign name='right' size={28} color='black' />
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: `100%`,
		width: `100%`,
	},
	detailerContainer: {
		backgroundColor: `pink`,
		flex: 1,
	},
	header: {
		flex: 0.5,
		backgroundColor: `lightgreen`,
	},
	body: {
		flexDirection: `row`,
		flex: 2,
		backgroundColor: `lightblue`,
	},
	content: {
		flex: 1,
		backgroundColor: `purple`,
	},
	nav: {
		flex: 0.25,
	},
	topRow: {},
	bottomRow: {},
});

export default ViewCalendar;
