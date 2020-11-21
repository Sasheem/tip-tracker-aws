import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CreateJob = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('CurrentJobs')}>
					<AntDesign name='close' size={32} color='black' />
				</TouchableOpacity>
			</View>
			<Text>Create Job</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: `flex-start`,
		alignItems: `center`,
		padding: 16,
	},
	header: {
		width: `100%`,
		justifyContent: `center`,
		alignItems: `flex-start`,
	},
});

export default CreateJob;
