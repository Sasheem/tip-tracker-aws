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
		backgroundColor: `#39A0ED`,
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	},
	title: {
		color: `white`,
		fontSize: 14,
		fontWeight: `300`,
		marginBottom: 1,
	},
	value: {
		color: `white`,
		fontSize: 16,
		fontWeight: `500`,
	},
	date: {
		fontSize: 12,
		color: `white`,
	},
});

export default MetricComponent;
