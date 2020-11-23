import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

/**
 *
 * @param {navigation} param0
 * ? object to handle navigation
 *
 * todo add error checking to handleSubmit
 * todo make api call to add form add as job
 * todo combine similar form styling into separate file - POST LAUNCH PRIORITY
 * ? see createShift component for similar styling
 */

const CreateJob = ({ navigation }) => {
	const [jobTitle, setJobTitle] = useState('');
	const [jobWage, setJobWage] = useState('');
	const [jobName, setJobName] = useState('');
	const [jobAddress, setJobAddress] = useState({
		city: '',
		country: '',
		address_line1: '',
		address_line2: '',
		address_state: '',
		address_zip: '',
	});
	const [formError, setFormError] = useState('');

	const onTitleChange = (text) => {
		setFormError('');
		setJobTitle(text);
	};

	const onWageChange = (text) => {
		setFormError('');
		setJobWage(text);
	};

	const onNameChange = (text) => {
		setFormError('');
		setJobName(text);
	};

	const onAddressChange = (event, name) => {
		setJobAddress({ ...jobAddress, [name]: event.nativeEvent.text });
	};

	const handleSubmit = () => {
		console.log(
			`save button pressed with state: ${jobTitle} - ${jobWage} - ${jobName} - ${JSON.stringify(
				jobAddress
			)}`
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('CurrentJobs')}>
					<AntDesign name='close' size={32} color='black' />
				</TouchableOpacity>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView>
						<View style={styles.inner}>
							<Text style={styles.title}>Create Job</Text>

							{/* Job Title Input */}
							<View style={styles.row}>
								<Text style={styles.subtitle}>Job Title</Text>
								<TextInput
									style={styles.textInput}
									placeholder='Server, Bartender, etc.'
									onChangeText={(text) => onTitleChange(text)}
									value={jobTitle}
								/>
							</View>

							{/* Job Wage Input */}
							<View style={styles.row}>
								<Text style={styles.subtitle}>Job Wage</Text>
								<TextInput
									style={styles.textInput}
									placeholder='5.54'
									keyboardType='decimal-pad'
									onChangeText={(text) => onWageChange(text)}
									value={jobWage}
								/>
							</View>

							{/* Job Name Input */}
							<View style={styles.row}>
								<Text style={styles.subtitle}>Job Name</Text>
								<TextInput
									style={styles.textInput}
									placeholder='Outback, Carrabas, etc.'
									onChangeText={(text) => onNameChange(text)}
									value={jobName}
								/>
							</View>

							<View style={styles.rowLg}>
								<Text style={styles.subtitle}>Job Address</Text>
								<TextInput
									style={styles.textInput}
									placeholder='Address Line 1'
									onChange={(event) => onAddressChange(event, 'address_line1')}
									value={jobAddress.address_line1}
								/>
								<TextInput
									style={styles.textInput}
									placeholder='Address Line 2'
									onChange={(event) => onAddressChange(event, 'address_line2')}
									value={jobAddress.address_line2}
								/>
								<TextInput
									style={styles.textInput}
									placeholder='City'
									onChange={(event) => onAddressChange(event, 'city')}
									value={jobAddress.city}
								/>
								<TextInput
									style={styles.textInput}
									placeholder='Zip Code'
									keyboardType='number-pad'
									onChange={(event) => onAddressChange(event, 'address_zip')}
									value={jobAddress.address_zip}
								/>
								<TextInput
									style={styles.textInput}
									placeholder='State'
									onChange={(event) => onAddressChange(event, 'address_state')}
									value={jobAddress.address_state}
								/>
							</View>
							<View style={styles.btnContainer}>
								<TouchableOpacity onPress={handleSubmit} style={styles.btn}>
									<Text>Save</Text>
								</TouchableOpacity>
							</View>
							{formError !== '' && (
								<Text style={{ color: `red` }}>{formError}</Text>
							)}
							<View style={styles.hardFiller} />
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	hardFiller: {
		height: 200,
	},
	container: {
		flex: 1,
		justifyContent: `flex-start`,
		padding: 12,
	},
	inner: {
		flex: 1,
	},
	header: {
		flex: 0.1,
		width: `100%`,
		justifyContent: `center`,
		alignItems: `flex-start`,
	},
	row: {
		flex: 1,
	},
	rowLg: {
		flex: 3,
	},
	btnContainer: {
		marginTop: 12,
		flex: 1,
	},
	btn: {
		padding: 10,
		backgroundColor: `lightblue`,
		alignItems: `center`,
		borderRadius: 2.5,
	},
	title: {
		fontSize: 36,
		marginBottom: 24,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: `bold`,
		paddingBottom: 5,
	},
	textInput: {
		height: 40,
		borderColor: '#000000',
		borderBottomWidth: 1,
		marginBottom: 36,
	},
});

export default CreateJob;
