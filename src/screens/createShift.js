import React, { useState, useEffect, useContext } from 'react';
import {
	Platform,
	KeyboardAvoidingView,
	View,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	Text,
	TextInput,
	TouchableOpacity,
	Switch,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';
import { createShift } from '../graphql/mutations';
import RNPickerSelect from 'react-native-picker-select';

import { Context as ShiftsContext } from '../context/ShiftsContext';
import { Context as JobsContext } from '../context/JobsContext';
import ShiftTag from '../components/shiftTag';
import CustomInput from '../components/common/customInput'

/**
 * todo add functionality to arrow buttons to modify date label DONE
 * todo add aws functionality to write shift to database DONE
 * todo test out handleSubmit DONE
 * todo handle case when handleSubmit runs and shift exists on that date
 * 		? check if in times overlap, add if they don't
 * 		? if they do, prompt user to edit shift instead or change times
 * todo add button for user to clear all form data
 * todo fix scrollView so it actually scrolls DONE
 * todo focus screen on tag input whenever user focuses on input DONE
 * todo add a subscription to update jobs array
 * todo remove tag from state when its corresponding delete button is pressed
 * todo replace Picker with RNPickerSelect
 * 		? check versus the month and year to see why the label issue is happening
 * todo needs to handle case where no data was input at all
 */

const CreateShift = ({ route }) => {
	// context
	const { state: fetchedShifts, addShift } = useContext(ShiftsContext);
	const { state: fetchedJobs, getJobs } = useContext(JobsContext);

	// state
	const [date, setDate] = useState(moment().format('L'));
	const [amount, setAmount] = useState('');
	const [inTime, setInTime] = useState('');
	const [outTime, setOutTime] = useState('');
	const [hours, setHours] = useState('');
	const [hoursToggled, setHoursToggled] = useState(false);
	const [job, setJob] = useState('default');
	const [jobs, setJobs] = useState([]);
	const [jobItems, setJobItems] = useState([]);
	const [jobLabel, setJobLabel] = useState('');
	const [tag, setTag] = useState('');
	const [tagToDelete, setTagToDelete] = useState('');
	const [tags, setTags] = useState([]);
	const [isInTimePickerVisible, setInTimePickerVisibility] = useState(false);
	const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);
	const [tagError, setTagError] = useState('');
	const [formError, setFormError] = useState('');
	
	// load date from route
	useEffect(() => {
		if (!_.isEmpty(route.params)) {
			console.log(`route.params: ${JSON.stringify(route.params)}`);
			route.params.currentDate !== '' && setDate(route.params.currentDate);
		}
	}, [route.params]);

	// handle removing tag from state
	useEffect(() => {
		if (tagToDelete !== '') {
			var newTags = _.filter(tags, (item) => item !== tagToDelete);
			console.log(`newTags: ${newTags.length}`);
			setTags(newTags);
		}
	}, [tagToDelete]);

	// when component mounts fetch jobs
	useEffect(() => {
		console.log(`createShift: fetching jobs`);
		getJobs();
		// console.log(`Jobs from App.js`);
		// setJobs(route.params.jobs);
	}, []);

	// create job array for RNPickerSelect
	useEffect(() => {
		var jobsToPick = [];

		_.map(fetchedJobs, (job) => {
			jobsToPick.push({
				label: `${job.jobTitle}`,
				value: `${job.id}`,
			});
		});
		setJobItems(jobsToPick);
	}, [fetchedJobs]);

	// helper functions
	const onAmountChange = (text) => {
		setFormError('');
		setAmount(text);
	};
	const onHoursChange = (text) => {
		setFormError('');
		setHours(text);
	};
	const onTagChange = (text) => {
		setTagError('');
		setTag(text);
	};
	const showInTimePicker = () => setInTimePickerVisibility(true);
	const showOutTimePicker = () => setOutTimePickerVisibility(true);
	const hideInTimePicker = () => setInTimePickerVisibility(false);
	const hideOutTimePicker = () => setOutTimePickerVisibility(false);


	// handle date back arrow pressed
	const handleDateBackward = () =>
		setDate(moment(date, 'L').subtract(1, 'day').format('L'));

	// handle date forward arrow pressed
	const handleDateForward = () =>
		setDate(moment(date, 'L').add(1, 'day').format('L'));

	// handle hours toggled
	const toggleSwitch = () => {
		setHoursToggled(!hoursToggled);
	};

	// handle in time confirmed
	const handleInTimeConfirm = (date) => {
		setInTime(date.toISOString());
		hideInTimePicker();
	};

	// handle out time confirmed
	const handleOutTimeConfirm = (date) => {
		setOutTime(date.toISOString());
		hideOutTimePicker();
	};

	// handle create tag
	const handleCreateTag = () => {
		// clear form data if user forgot to add their tag to shift object
		setFormError('');

		// check if tag input has value
		if (tag === '') {
			return setTagError('Enter a tag value');
		}
		// check if tags array is empty
		if (tags.length === 0) {
			setTags([tag]);
			setTag('');
		} else {
			// if not, check if tag already exists
			if (tags.includes(tag)) {
				setTagError('Tag already exists');
			} else {
				// if not, concatenate tag to array and clear input field
				setTags([...tags, tag]);
				setTag('');
			}
		}
	};

	// handle form submit, create shift
	const handleSubmit = () => {
		var duration = '';
		console.log(`job: ${jobLabel}`);
		if (tag !== '') {
			return setFormError('Add your current tag to shift');
		}
		if (job === 'default') {
			return setFormError('Select a job');
		}

		// calculate hours if hours is not provided OR
		// if inTime AND outTime are provided
		if (hours === '' || (inTime !== '' && outTime !== '')) {
			var start = moment(inTime);
			var end = moment(outTime);
			duration = Math.abs(start.diff(end, 'hours', true)).toFixed(2);
			console.log(`duration: ${duration} typeof: ${typeof duration}`);
			setHours(duration);
		}

		// make sure hours isn't larger than 24
		if (parseInt(hours) > 24) {
			return setFormError(`Too many hours in a day`);
		}

		// trigger addShift action - see ShiftsContext.js
		addShift(date, amount, inTime, outTime, duration !== '' ? duration : hours, job, tags, () => console.log(`Shift added!`))

		// clear the form data
		setDate(moment().format('L'));
		setAmount('');
		setHours('');
		setInTime('');
		setOutTime('');
		setJob(null);
		setTags([]);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView>
					<View style={styles.inner}>
						{/* Date */}
						<View
							style={{
								flexDirection: `row`,
								justifyContent: `space-evenly`,
								alignItems: `center`,
								marginBottom: 20,
							}}
						>
							<AntDesign
								name='left'
								size={28}
								color='#06D6A0'
								onPress={handleDateBackward}
							/>
							<Text style={{ fontSize: 24 }}>{date}</Text>
							<AntDesign
								name='right'
								size={28}
								color='#06D6A0'
								onPress={handleDateForward}
							/>
						</View>

						{/* Amount Earned + Position Worked */}
						<View style={[styles.row2x, { marginBottom: 20 }]}>
							{/* Amount Earned */}
							<View style={styles.rowComponent}>
								<CustomInput 
									label='Earnings' 
									placeholder='$0.00' 
									customInputStyle={styles.earningsIOS} 
									onChangeText={(text) => onAmountChange(text)} 
									value={amount} 
									keyboardType='decimal-pad' 
									returnKeyType='done' 
								/>
							</View>
							<View style={styles.rowFiller} />

							{/* Position Worked */}
							<View style={styles.rowComponent}>
								<Text style={[styles.subtitle, { paddingTop: 5 }]}>Position</Text>
								<RNPickerSelect
									placeholder={{
										label: 'Pick job',
										value: null,
									}}
									onValueChange={(value) => setJob(value)}
									items={jobItems}
									value={job}
									useNativeAndroidPickerStyle={false}
									Icon={() => (
										<AntDesign name='down' size={16} color='#D1D5DE' />
									)}
									style={pickerStyles}
								/>
							</View>
						</View>

						{/* Hours Worked */}
						<View style={{ marginBottom: 20 }}>
							{hoursToggled ? (
								<View style={{ flexDirection: `row`, marginBottom: 20 }}>
								<View style={styles.rowComponent}>
									<Text style={styles.subtitle}>In Time</Text>
									<TouchableOpacity
										onPress={showInTimePicker}
										style={styles.input}
									>
										<Text>
											{inTime !== ''
												? moment(inTime).format('hh:mm a')
												: 'Select time'}
										</Text>
									</TouchableOpacity>
									<DateTimePickerModal
										isVisible={isInTimePickerVisible}
										mode='time'
										onConfirm={handleInTimeConfirm}
										onCancel={hideInTimePicker}
									/>
								</View>
								<View style={styles.rowFiller} />
								<View style={styles.rowComponent}>
									<Text style={styles.subtitle}>Out Time</Text>
									<TouchableOpacity
										onPress={showOutTimePicker}
										style={styles.input}
									>
										<Text>
											{outTime !== ''
												? moment(outTime).format('hh:mm a')
												: 'Select time'}
										</Text>
									</TouchableOpacity>
									<DateTimePickerModal
										isVisible={isOutTimePickerVisible}
										mode='time'
										onConfirm={handleOutTimeConfirm}
										onCancel={hideOutTimePicker}
									/>
								</View>
							</View>
							) : (
								<View>
									<CustomInput
										label='Hours' 
										placeholder='4.5'
										customInputStyle={
											Platform.OS === 'ios'
											? styles.earningsIOS
											: styles.earningsAndroid
										}
										onChangeText={(text) => onHoursChange(text)}
										value={hours}
										keyboardType='decimal-pad'
										returnKeyType='done'
									/>
								</View>
							)}
							<View
								style={{
									flex: 1,
									flexDirection: `row`,
									alignItems: `center`,
									justifyContent: `flex-end`,
									marginTop: 20,
									marginBottom: 20,
									width: `100%`,
								}}
							>
								<Text style={{ marginRight: 10 }}>In/Out Time</Text>
								<Switch
									trackColor={{ false: '#767577', true: '#06D6A0' }}
									thumbColor='#f4f3f4'
									ios_backgroundColor='#3e3e3e'
									onValueChange={toggleSwitch}
									value={hoursToggled}
								/>
							</View>
						</View>

						{/* Form Row: Shift Tags */}
						<View>
							<Text style={styles.subtitle}>Add tag</Text>
							<View
								style={[
									{ flexDirection: `row`, marginBottom: 10 },
									styles.input,
								]}
							>
								<TextInput
									placeholder="Ex: Mother's Day"
									style={{ flex: 3 }}
									onChangeText={(text) => onTagChange(text)}
									value={tag}
								/>
								<View
									style={{
										flex: 1,
										justifyContent: `center`,
										alignItems: `flex-end`,
									}}
								>
									<TouchableOpacity onPress={handleCreateTag}>
										<AntDesign name='plus' size={24} color='#B3BAC9' />
									</TouchableOpacity>
								</View>
							</View>

							<SafeAreaView>
								<ScrollView horizontal={true}>
									{tags.length !== 0 &&
										_.map(tags, (item) => (
											<ShiftTag
												key={item}
												text={item}
												forDetail={false}
												setTagToDelete={setTagToDelete}
											/>
										))}
								</ScrollView>
							</SafeAreaView>

							{/* Conditionally render tag error message */}
							{tagError !== '' && (
								<Text style={{ color: `red` }}>{tagError}</Text>
							)}
						</View>

						{/* Submit Data to database button */}
						<View style={styles.btnContainer}>
							<TouchableOpacity
								onPress={handleSubmit}
								style={styles.buttonSubmit}
							>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
						</View>

						{/* Form  Error Message */}
						{formError !== '' && (
							<Text style={{ color: `red` }}>{formError}</Text>
						)}

						<View style={styles.hardFiller} />
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	hardFiller: {
		height: 100,
	},
	container: {
		flex: 1,
	},
	inner: {
		paddingTop: 24,
		paddingLeft: 48,
		paddingRight: 48,
		flex: 1,
		justifyContent: `space-evenly`,
	},
	headerText: {
		fontSize: 40,
		paddingLeft: 24,
		paddingTop: 48,
		paddingBottom: 24,
		textAlign: `left`,
	},
	title: {
		fontSize: 32,
		marginBottom: 24,
		textAlign: `center`,
	},
	subtitle: {
		fontSize: 16,
		paddingBottom: 5,
		borderBottomWidth: 0.5,
		borderBottomColor: 'lightgrey',
	},
	textInput: {
		height: 40,
		borderColor: '#000000',
		borderBottomWidth: 1,
		marginBottom: 36,
	},
	buttonText: {
		color: `white`,
		fontSize: 16,
		fontWeight: `500`,
	},
	buttonSubmit: {
		padding: 10,
		backgroundColor: `#06D6A0`,
		alignItems: `center`,
		borderRadius: 2.5,
	},
	earningsIOS: { fontSize: 16 },
	btnContainer: {
		marginTop: 12,
	},
	row2x: {
		flexDirection: `row`,
	},
	rowComponent: {
		flex: 1,
	},
	rowFiller: {
		flex: 0.1,
	},
	input: {
		borderWidth: 0.5,
		borderColor: `#B3BAC9`,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
});

const pickerStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: '#B3BAC9',
		borderRadius: 6,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
		marginBottom: 2,
		color: `gray`,
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: '#B3BAC9',
		borderRadius: 6,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	iconContainer: {
		top: Platform.OS === 'ios' ? 10 : 15,
		right: Platform.OS === 'ios' ? 15 : 10,
	},
});

export default CreateShift;
