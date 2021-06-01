import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// local components
import Input from '../components/common/input';
import Button from '../components/common/button';

const SettingsAccount = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// controlled form functions
	const onEmailChange = text => {
		setEmail(text);
		setErrorMessage('');
	}
	const onPasswordChange = text => {
		setPassword(text);
		setErrorMessage('');
	}
	const onNewChange = text => {
		setNewPassword(text);
		setErrorMessage('');
	}
 	const onConfirmChange = text => {
		setConfirm(text);
		setErrorMessage('');
	}
	const onSaveEmail = () => {
		console.log('attempting to save email');
	}
	const onSavePassword = () => {
		console.log('attempting to save password');
	}
	return (
		<View style={styles.container}>
			<Input 
				label='Email'
				placeholder='example@email.com'
				onChangeText={(text) => onEmailChange(text)}
				value={email}
				keyboardType='default'
			/>
			<View style={styles.buttonContainer}>
				<Button onPress={onSaveEmail} label='Save email' />
			</View>
			<View style={styles.horizontalRule} />
			<Input 
				label='Current password'
				placeholder='Add password requirements'
				onChangeText={(text) => onPasswordChange(text)}
				value={password}
				secureTextEntry={true}
			/>
			<Input 
				label='New password'
				placeholder='Add password requirements'
				onChangeText={(text) => onNewChange(text)}
				value={newPassword}
				secureTextEntry={true}
			/>
			<Input 
				label='Confirm password'
				placeholder='Confirm password'
				onChangeText={(text) => onConfirmChange(text)}
				value={confirm}
				secureTextEntry={true}
			/>
			<View style={styles.buttonContainer}>
				<Button onPress={onSavePassword} label='Save password' />
			</View>
			<View style={styles.fillerMd} />
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
	subtitle: {

	},
	horizontalRule: {
		height: 1,
		backgroundColor: `lightgrey`,
		width: `100%`,
	},
	fillerLg: {
		flex: 4,
	},
	fillerMd: {
		flex: 2.5,
	},
	buttonContainer: {
		flex: 1,
		alignSelf: `flex-end`
	}
});

export default SettingsAccount;
