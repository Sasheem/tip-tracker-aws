import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SummaryMetric = ({ title, value }) => {
	return (
		<View style={styles.container}>
			<Text>{title}</Text>
			<Text>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {},
	value: {},
});

export default SummaryMetric;
