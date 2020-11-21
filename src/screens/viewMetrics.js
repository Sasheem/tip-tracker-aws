import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ViewMetrics = () => {
	return (
		<View style={styles.container}>
			<Text>Metrics</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default ViewMetrics;
