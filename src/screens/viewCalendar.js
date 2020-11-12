import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CalendarComponent from '../components/calendarComponent';
import CalendarDetail from '../components/calendarDetail';

const ViewCalendar = () => {
	return (
		<View style={styles.container}>
			<CalendarComponent />
			<CalendarDetail />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: `100%`,
		width: `100%`,
	},
});

export default ViewCalendar;
