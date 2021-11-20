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
	container: {
		flex: 1,
		borderRadius: 6,
		paddingVertical: 5,
	},
	title: {
		color: `black`,
		fontSize: 14,
		fontWeight: `300`,
		marginBottom: 1,
	},
	value: {
		color: `#39A0ED`,
		fontSize: 16,
		fontWeight: `500`,
	},
	date: {
		fontSize: 12,
		color: `#829191`,
	},
});

export default MetricComponent;
