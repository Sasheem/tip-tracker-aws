import React, { useState, useEffect } from 'react';
import {
	Platform,
	View,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import ShiftTag from './shiftTag';

/**
 * todo add functionality to arrow buttons to modify date label
 * todo add aws functionality to write shift to database
 */

const NewShiftForm = () => {
	const [id, setId] = useState('');
	const [date, setDate] = useState(moment().format('L'));
	const [earnings, setEarnings] = useState('');
	const [inTime, setInTime] = useState('');
	const [outTime, setOutTime] = useState('');
	const [job, setJob] = useState('default');
	const [tag, setTag] = useState('');
	const [tags, setTags] = useState([]);
	const [isInTimePickerVisible, setInTimePickerVisibility] = useState(false);
	const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);
	const [tagError, setTagError] = useState('');
	const [formError, setFormError] = useState('');

	// helper functions
	const onEarningsChange = (text) => {
		setFormError('');
		console.log(`text: ${text}`);
		setEarnings(text);
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
		if (earnings === '') {
			return setFormError('Enter amount for earnings');
		}

		if (job === 'default') {
			return setFormError('Select a job');
		}

		console.log(`Earnings: $${earnings}.00`);
		console.log(`Job: ${job}`);
		console.log(`In Time: ${inTime}`);
		console.log(`Out Time: ${outTime}`);
		console.log(`# of Shift Tags: ${tags.length}`);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
				{/* Filler Component Margin Top */}
				<View style={styles.filler} />

				{/* Form Component */}
				<View style={styles.formComponent}>
					<View>
						<Text style={styles.titleText}>Create a shift</Text>
					</View>

					{/* Form Row: Date */}
					<View
						style={{
							flexDirection: `row`,
							justifyContent: `space-evenly`,
							alignItems: `center`,
							marginTop: 20,
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

					{/* Form Row: Earnings + Job */}
					<View style={{ flexDirection: `row` }}>
						<View style={styles.rowComponent}>
							<Text style={styles.subtitleText}>Enter earnings</Text>
							<TextInput
								placeholder='$0.00'
								// autoFocus={true}
								keyboardType='decimal-pad'
								style={
									Platform.OS === 'ios'
										? styles.earningsIOS
										: styles.earningsAndroid
								}
								onChangeText={(text) => onEarningsChange(text)}
								value={earnings}
							/>
						</View>
						<View style={styles.rowComponent}>
							<Text style={styles.subtitleText}>Select position</Text>
							<Picker
								selectedValue={job}
								style={Platform.OS === 'ios' ? {} : { height: 50 }}
								onValueChange={(itemValue, itemIndex) => setJob(itemValue)}
							>
								<Picker.Item label='Pick a job' value='default' />
								<Picker.Item label='Server' value='server' />
								<Picker.Item label='Bartender' value='bar' />
								<Picker.Item label='Key' value='key' />
							</Picker>
						</View>
					</View>

					{/* Form Row: In Time + Out Time */}
					<View style={{ flexDirection: `row` }}>
						<View style={styles.rowComponent}>
							<Text style={styles.subtitleText}>Clocked in</Text>
							<Button
								title={
									inTime !== '' ? moment(inTime).format('hh:mm a') : 'In Time'
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
							<Text style={styles.subtitleText}>Clocked out</Text>
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

					{/* Form Row: Shift Tags */}
					<View
						style={{
							justifyContent: `space-evenly`,
						}}
					>
						<Text style={styles.subtitleText}>Add Shift Tags</Text>
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

						<View
							style={{
								flexDirection: `row`,
								alignItems: `center`,
								height: 50,
								width: `100%`,
							}}
						>
							{tags.length !== 0 &&
								tags.map((tag) => <ShiftTag key={tag} text={tag} />)}
						</View>

						{/* Conditionally render tag error message */}
						{tagError !== '' && (
							<Text style={{ color: `red` }}>{tagError}</Text>
						)}
					</View>
					{/* Submit Data to database button */}
					<View>
						<TouchableOpacity
							onPress={handleSubmit}
							style={{
								zIndex: 3,
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
				</View>

				{/* Filler Component Margin Bottom */}
				<View style={styles.filler} />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: `80%`,
		justifyContent: `center`,
	},
	earningsIOS: { fontSize: 34, width: 150 },
	earningsAndroid: { height: 50, width: 150 },
	formComponent: {
		flex: 5,
	},
	rowComponent: {
		flex: 1,
	},
	rowFiller: {
		flex: 0.1,
	},
	filler: {
		flex: Platform.OS === 'android' ? 1 : 0.5,
	},
	titleText: {
		fontSize: 24,
		fontWeight: `bold`,
	},
	subtitleText: {
		fontSize: 16,
		fontWeight: `bold`,
		paddingBottom: 5,
		borderBottomWidth: 0.5,
		borderBottomColor: 'lightgrey',
	},
});

export default NewShiftForm;
