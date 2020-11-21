import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.userInfoContainer}>
				<Text style={styles.subtitleLg}>User Name</Text>
				<Text>user email</Text>
			</View>
			<View>
				<Text style={styles.subtitleMd}>Profile</Text>
				<TouchableOpacity
					style={styles.row}
					onPress={() => {
						navigation.navigate('Profile');
					}}
				>
					<Text>Profile</Text>
					<AntDesign name='right' size={24} color='black' />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.row}
					onPress={() => {
						navigation.navigate('Jobs');
					}}
				>
					<Text>Jobs</Text>
					<AntDesign name='right' size={24} color='black' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
	},
	row: {
		flexDirection: `row`,
		width: `100%`,
		justifyContent: `space-between`,
		alignItems: `center`,
		borderBottomColor: `black`,
		borderBottomWidth: 1,
		paddingBottom: 16,
		marginBottom: 16,
	},
	userInfoContainer: {
		marginBottom: 32,
	},
	subtitleLg: {
		fontSize: 24,
		fontWeight: `600`,
	},
	subtitleMd: {
		fontSize: 20,
		fontWeight: `500`,
	},
});

export default Settings;
