import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';

// mockup
const Settings = ({ navigation }) => {
	const [userInfo, setUserInfo] = useState({});
	// load user info from backend
	useEffect(() => {
		try {
			fetchUser();
		} catch(err) {
			console.log(`error: ${err}`);
		}
	}, []);

	const fetchUser = async () => {
		const result = await Auth.currentUserInfo();
		setUserInfo(result);
	}

	return (
		<View style={styles.container}>
			<View style={styles.userInfoContainer}>
				<Text style={styles.subtitleLg}>Username</Text>
				{!_.isEmpty(userInfo) && <Text>{userInfo.attributes.email}</Text>}
				{console.log(userInfo)}
			</View>
			<View style={styles.settingsContainer}>
				<Text style={styles.subtitleMd}>Settings</Text>
				<TouchableOpacity
					style={styles.row}
					onPress={() => {
						navigation.navigate('Account');
					}}
				>
					<Text>Account</Text>
					<AntDesign name='right' size={24} color='black' />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.row}
					onPress={() => {
						navigation.navigate('Set_Up');
					}}
				>
					<Text>Set Up</Text>
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
				<TouchableOpacity
					style={styles.row}
					onPress={() => {
						navigation.navigate('Storage');
					}}
				>
					<Text>Storage</Text>
					<AntDesign name='right' size={24} color='black' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: `flex`,
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
		marginTop: 8,
		marginBottom: 16,
	},
	userInfoContainer: {
		marginBottom: 32,
		flex: 0.3,
	},
	subtitleLg: {
		fontSize: 24,
		fontWeight: `600`,
	},
	subtitleMd: {
		fontSize: 20,
		fontWeight: `500`,
	},
	settingsContainer: {
		flex: 5,
		height: `100%`,
		display: `flex`,
	},
});

export default Settings;
