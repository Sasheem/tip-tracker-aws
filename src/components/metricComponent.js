import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MetricComponent = ({ title, value, date }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.value}>{value}</Text>
			{date !== null && <Text style={styles.date}>{date}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {},
	value: {},
	date: {
		fontSize: 12,
		color: `grey`,
	},
});

export default MetricComponent;
