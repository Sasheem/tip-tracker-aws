import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

const SettingsSubscription = () => {

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Your subscription</Text>
			<Text>Manage your subscription for access to features like tracking multiple jobs, shift metrics, and cloud storage.</Text>
            <Text>[Subscription Status]</Text>
            <Text>[Subscription Cancel]</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		flex: 1,
		alignItems: `flex-start`,
	},
	label: {
		fontSize: 16,
		fontWeight: `500`
	},
	horizontalRule: {
		height: 1,
		backgroundColor: `lightgrey`,
		width: `100%`,
		marginBottom: 5,
		marginTop: 2.5,
	},
});

export default SettingsSubscription;
