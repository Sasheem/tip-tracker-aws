import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SummaryMetric = ({ title, value }) => {
	return (
		<View style={styles.container}>
			<Text>{title}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {},
	value: {
		color: `#829191`,
	},
});

export default SummaryMetric;
