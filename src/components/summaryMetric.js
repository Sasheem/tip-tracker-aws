import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SummaryMetric = ({ title, value }) => {
	return (
		<View>
			<Text>{title}</Text>
			<Text>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {},
	value: {},
});

export default SummaryMetric;
