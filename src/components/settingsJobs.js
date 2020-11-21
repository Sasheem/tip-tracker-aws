import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SettingsJobs = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Jobs</Text>
			<View style={styles.addJobContainer}>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => navigation.navigate('CreateJobModal')}
				>
					<AntDesign name='plus' color='white' size={32} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: `space-between`,
	},
	addJobContainer: {
		flex: 0.25,
		justifyContent: `flex-end`,
		alignItems: `flex-end`,
		padding: 32,
	},
	addButton: {
		borderRadius: 50,
		backgroundColor: `lightblue`,
		padding: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});

export default SettingsJobs;
