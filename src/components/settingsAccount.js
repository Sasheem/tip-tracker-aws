import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

// local components
import CustomInput from './common/customInput';
import CustomButton from './common/customButton';

const SettingsAccount = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// controlled form functions
	const onFirstChange = text => {
		setFirstName(text);
		setErrorMessage('');
	}
	const onLastChange = text => {
		setLastName(text);
		setErrorMessage('');
	}
 	const onEmailChange = text => {
		setEmail(text);
		setErrorMessage('');
	}
	const onPhoneChange = text => {
		setPhone(text);
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
		Alert.alert('attempting to save email');
	}
	const onSavePassword = () => {
		Alert.alert('attempting to save password');
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Personal Info</Text>
			<CustomInput 
				label='First name'
				onChangeText={text => onFirstChange(text)}
				value={firstName}
				keyboardType='default'
			/>
			<CustomInput 
				label='Last name'
				onChangeText={text => onLastChange(text)}
				value={lastName}
				keyboardType='default'
			/>
			<View style={styles.horizontalRule} />
			<Text style={styles.title}>Contact Info</Text>
			<CustomInput 
				label='Email'
				placeholder='example@email.com'
				onChangeText={(text) => onEmailChange(text)}
				value={email}
				keyboardType='default'
			/>
			<CustomInput 
				label='Phone'
				placeholder='(555)-555-5555'
				onChangeText={(text) => onPhoneChange(text)}
				value={phone}
				keyboardType='phone-pad'
			/>
			
			<CustomInput 
				label='Current password'
				placeholder='Add password requirements'
				onChangeText={(text) => onPasswordChange(text)}
				value={password}
				secureTextEntry={true}
			/>
			<CustomInput 
				label='New password'
				placeholder='Add password requirements'
				onChangeText={(text) => onNewChange(text)}
				value={newPassword}
				secureTextEntry={true}
			/>
			<CustomInput 
				label='Confirm password'
				placeholder='Confirm password'
				onChangeText={(text) => onConfirmChange(text)}
				value={confirm}
				secureTextEntry={true}
			/>
			<View style={styles.buttonContainer}>
				<CustomButton onPress={onSavePassword} label='Save password' />
			</View>
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
	title: {
		fontSize: 15,
		fontWeight: `700`
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
	fillerLg: {
		flex: 4,
	},
	fillerMd: {
		flex: 2,
	},
	buttonContainer: {
		flex: 1,
		alignSelf: `flex-end`
	}
});

export default SettingsAccount;
