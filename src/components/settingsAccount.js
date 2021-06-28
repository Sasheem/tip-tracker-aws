import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

// local components
import CustomInput from './common/customInput';
import CustomButton from './common/customButton';

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
	const onPurchase = () => {
		Alert.alert('Purchase button pressed!');

		// run app store purchases
		// if success save boolean var on AWS and Async Storage
	};
	const onSaveEmail = () => {
		Alert.alert('attempting to save email');
	}
	const onSavePassword = () => {
		Alert.alert('attempting to save password');
	}
	return (
		<View style={styles.container}>
			<Text style={styles.label}>Upgrade to Pro</Text>
			<Text>Upgrade account to pro for access to features like tracking multiple jobs, shift metrics, and cloud storage.</Text>
			<View style={styles.buttonContainer}>
				<CustomButton onPress={onPurchase} label='Purchase' />
			</View>
			<CustomInput 
				label='Email'
				desc='Update the e-mail on file.'
				placeholder='example@email.com'
				onChangeText={(text) => onEmailChange(text)}
				value={email}
				keyboardType='default'
			/>
			<View style={styles.buttonContainer}>
				<CustomButton onPress={onSaveEmail} label='Save email' />
			</View>
			<View style={styles.horizontalRule} />
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
