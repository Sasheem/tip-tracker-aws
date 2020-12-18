import React, { useState, useEffect } from 'react';
import {
	Platform,
	KeyboardAvoidingView,
	View,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	Text,
	TextInput,
	Button,
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
import { Picker } from '@react-native-picker/picker';
import { createShift } from '../graphql/mutations';
import { listJobs } from '../graphql/queries';
import RNPickerSelect from 'react-native-picker-select';

import ShiftTag from '../components/shiftTag';

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
 */

const CreateShift = () => {
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
	const [tags, setTags] = useState([]);
	const [isInTimePickerVisible, setInTimePickerVisibility] = useState(false);
	const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);
	const [tagError, setTagError] = useState('');
	const [formError, setFormError] = useState('');

	// when component mounts fetch jobs
	useEffect(() => {
		console.log(`fetching jobs`);
		getJobs();
	}, []);

	// create job array for RNPickerSelect
	useEffect(() => {
		var jobsToPick = [];

		_.map(jobs, (job) => {
			jobsToPick.push({
				label: `${job.jobTitle}`,
				value: `${job.id}`,
			});
		});
		setJobItems(jobsToPick);
	}, [jobs]);

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

	// fetch jobs
	const getJobs = async () => {
		const result = await API.graphql(graphqlOperation(listJobs));
		setJobs(result.data.listJobs.items);
	};

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

		// prepare data
		const input = {
			createdAt: date,
			amount,
			inTime,
			outTime,
			hours: duration !== '' ? duration : hours,
			job,
			tags,
		};

		// write to backend
		API.graphql(graphqlOperation(createShift, { input }));

		// clear the form data
		setDate(moment().format('L'));
		setAmount('');
		setHours('');
		setInTime('');
		setOutTime('');
		setJob('default');
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
						{/* Title */}
						{/* <Text style={styles.title}>Add a shift</Text> */}

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
								color='black'
								onPress={handleDateBackward}
							/>
							<Text style={{ fontSize: 24 }}>{date}</Text>
							<AntDesign
								name='right'
								size={28}
								color='black'
								onPress={handleDateForward}
							/>
						</View>

						{/* Amount Earned + Position Worked */}
						<View style={styles.row2x}>
							{/* Amount Earned */}
							<View style={styles.rowComponent}>
								<Text style={styles.subtitle}>Amount earned</Text>
								<TextInput
									placeholder='$0.00'
									style={styles.textInput}
									keyboardType='decimal-pad'
									style={
										Platform.OS === 'ios'
											? styles.earningsIOS
											: styles.earningsAndroid
									}
									onChangeText={(text) => onAmountChange(text)}
									value={amount}
									returnKeyType='done'
								/>
							</View>
							<View style={styles.rowFiller} />

							{/* Position Worked */}
							<View style={styles.rowComponent}>
								<Text style={styles.subtitle}>Select position</Text>
								<RNPickerSelect
									onValueChange={(value) => setJobLabel(value)}
									items={jobItems}
									value={jobLabel}
								/>
							</View>
						</View>

						{/* Hours Worked */}
						<View>
							{hoursToggled ? (
								<View>
									<Text style={styles.subtitle}>Hours worked</Text>
									<TextInput
										placeholder='4.5'
										// autoFocus={true}
										keyboardType='decimal-pad'
										style={
											Platform.OS === 'ios'
												? styles.earningsIOS
												: styles.earningsAndroid
										}
										onChangeText={(text) => onHoursChange(text)}
										value={hours}
									/>
								</View>
							) : (
								<View style={{ flexDirection: `row` }}>
									<View style={styles.rowComponent}>
										<Text style={styles.subtitle}>Clocked in</Text>
										<Button
											title={
												inTime !== ''
													? moment(inTime).format('hh:mm a')
													: 'In Time'
											}
											onPress={showInTimePicker}
										/>
										<DateTimePickerModal
											isVisible={isInTimePickerVisible}
											mode='time'
											onConfirm={handleInTimeConfirm}
											onCancel={hideInTimePicker}
										/>
									</View>
									<View style={styles.rowFiller} />
									<View style={styles.rowComponent}>
										<Text style={styles.subtitle}>Clocked out</Text>
										<Button
											title={
												outTime !== ''
													? moment(outTime).format('hh:mm a')
													: 'Out Time'
											}
											onPress={showOutTimePicker}
										/>
										<DateTimePickerModal
											isVisible={isOutTimePickerVisible}
											mode='time'
											onConfirm={handleOutTimeConfirm}
											onCancel={hideOutTimePicker}
										/>
									</View>
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
								<Text>Hours</Text>
								<Switch
									trackColor={{ false: '#767577', true: '#81b0ff' }}
									thumbColor={hoursToggled ? '#f5dd4b' : '#f4f3f4'}
									ios_backgroundColor='#3e3e3e'
									onValueChange={toggleSwitch}
									value={hoursToggled}
								/>
							</View>
						</View>

						{/* Form Row: Shift Tags */}
						<View>
							<Text style={styles.subtitle}>Add Shift Tags</Text>
							<View
								style={{
									flexDirection: `row`,
								}}
							>
								<TextInput
									placeholder="Ex: Mother's Day"
									style={{ height: 50, flex: 3 }}
									onChangeText={(text) => onTagChange(text)}
									value={tag}
								/>
								<View style={{ flex: 1, justifyContent: `center` }}>
									<TouchableOpacity onPress={handleCreateTag}>
										<AntDesign name='plus' size={24} color='blue' />
									</TouchableOpacity>
								</View>
							</View>

							<SafeAreaView>
								<ScrollView horizontal={true}>
									{tags.length !== 0 &&
										tags.map((tag) => <ShiftTag key={tag} text={tag} />)}
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
								style={{
									padding: 10,
									backgroundColor: `lightblue`,
									alignItems: `center`,
									borderRadius: 2.5,
								}}
							>
								<Text>Add</Text>
							</TouchableOpacity>
						</View>
						{formError !== '' && (
							<Text style={{ color: `red` }}>{formError}</Text>
						)}

						{/* <View style={styles.btnContainer}>
							<Button title='Submit' onPress={() => null} />
						</View> */}
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
		padding: 24,
		flex: 1,
		justifyContent: `space-evenly`,
	},
	title: {
		fontSize: 32,
		marginBottom: 24,
		textAlign: `center`,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: `bold`,
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
	earningsIOS: { fontSize: 20 },
	earningsAndroid: { height: 50 },
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
});

export default CreateShift;
