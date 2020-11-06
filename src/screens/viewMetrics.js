import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ViewMetrics = () => {
	return (
		<View style={styles.container}>
			<Text>Metrics about your shifts</Text>
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

export default ViewMetrics;
