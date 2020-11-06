import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ViewCalendar = () => {
	return (
		<View style={styles.container}>
			<Text>Calendar View of Shifts</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ViewCalendar;
