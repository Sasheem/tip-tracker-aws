import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SettingsProfile = () => {
	return (
		<View style={styles.container}>
			<Text>Profile</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: `center`,
		alignItems: `center`,
	},
});

export default SettingsProfile;
