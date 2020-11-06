import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	Text,
	TextInput,
	Button,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const NewShiftForm = () => {
	const [id, setId] = useState('');
	const [earnings, setEarnings] = useState('');
	const [isInTimePickerVisible, setInTimePickerVisibility] = useState(false);
	const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);
	const [tags, setTags] = useState([]);

	// helper functions
	const showInTimePicker = () => setInTimePickerVisibility(true);
	const showOutTimePicker = () => setOutTimePickerVisibility(true);
	const hideInTimePicker = () => setInTimePickerVisibility(false);
	const hideOutTimePicker = () => setOutTimePickerVisibility(false);

	// handle in time confirmed
	const handleInTimeConfirm = (date) => {
		console.warn('An in time has been selected', date);
		console.log(`Type is ${typeof date}`);
		hideInTimePicker();
	};

	// handle out time confirmed
	const handleOutTimeConfirm = (date) => {
		console.warn('An out time has been selected', date);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.formComponent}>
				{/* Filler Component Margin Top */}
				<View style={styles.filler} />
				<View style={styles.rowComponent}>
					<Text style={styles.titleText}>Create a shift</Text>
				</View>

				{/* Form Row: Earnings */}
				<View style={styles.rowComponent}>
					<Text>Enter earnings</Text>
					<TextInput placeholder='$0.00' />
				</View>

				{/* Form Row: In Time */}
				<View style={styles.rowComponent}>
					<Text>Enter In-Time</Text>
					<Button title='Select In Time' onPress={showInTimePicker} />
					<DateTimePickerModal
						isVisible={isInTimePickerVisible}
						mode='time'
						onConfirm={handleInTimeConfirm}
						onCancel={hideInTimePicker}
					/>
				</View>

				{/* Form Row: Out Time */}
				<View style={styles.rowComponent}>
					<Text>Enter Out-Time</Text>
					<Button title='Select Out Time' onPress={showOutTimePicker} />
					<DateTimePickerModal
						isVisible={isOutTimePickerVisible}
						mode='time'
						onConfirm={handleOutTimeConfirm}
						onCancel={hideOutTimePicker}
					/>
				</View>

				{/* Filler Component Margin Bottom */}
				<View style={styles.filler} />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	formComponent: {
		flex: 1,
		width: `80%`,
		justifyContent: `center`,
	},
	rowComponent: {
		flex: 1,
	},
	filler: {
		flex: 2,
	},
	titleText: {
		fontSize: 20,
		fontWeight: `bold`,
	},
});

export default NewShiftForm;
