import React, { useState } from 'react';
import {
	Platform,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Button,
	Switch,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';

import ShiftTag from './shiftTag';

const EditShift = ({ shift, job, setEditModal, handleEditShift }) => {
	const [data, setData] = useState({
		date: '',
		amount: '',
		hours: '',
		inTime: '',
		outTime: '',
		tags: [],
	});
	const [formError, setFormError] = useState('');
	const [isInTimePickerVisible, setInTimePickerVisibility] = useState(false);
	const [isOutTimePickerVisible, setOutTimePickerVisibility] = useState(false);
	const [tag, setTag] = useState('');
	const [hoursToggled, setHoursToggled] = useState(false);

	// handle hours toggled
	const toggleSwitch = () => {
		setHoursToggled(!hoursToggled);
	};

	const showInTimePicker = () => setInTimePickerVisibility(true);
	const showOutTimePicker = () => setOutTimePickerVisibility(true);
	const hideInTimePicker = () => setInTimePickerVisibility(false);
	const hideOutTimePicker = () => setOutTimePickerVisibility(false);

	// handle creating a tag
	const handleCreateTag = () => {
		// clear form data if user forgot to add their tag to shift object
		setFormError('');

		// check if tag input has value
		if (tag === '') {
			return setTagError('Enter a tag value');
		}

		if (tags.length === 0) {
			setData({ ...data, tags: [tag] });
			setTag('');
		} else {
			// if not, check if tag already exists
			if (data.tags.includes(tag)) {
				setFormError('Tag already exists');
			} else {
				setData({ ...data, tags: [...data.tags, tag] });
				setTag('');
			}
		}
	};

	// handle in time confirmed
	const handleInTimeConfirm = (date) => {
		// setInTime(date.toISOString());
		setData({ ...data, inTime: date.toISOString() });
		setInTimePickerVisibility(false);
	};

	// handle out time confirmed
	const handleOutTimeConfirm = (date) => {
		setData({ ...data, outTime: date.toISOString() });
		setOutTimePickerVisibility(false);
	};

	const onAmountChange = (text) => {
		setFormError('');
		setData({ ...data, amount: text });
	};

	const onHoursChange = (text) => {
		setFormError('');
		setData({ ...setData, hours: text });
	};

	return (
		<View style={styles.container}>
			{/* Date Row */}
			<View style={styles.column}>
				<Text style={styles.subtitle}>Date</Text>
				<Text>{shift.createdAt}</Text>
			</View>

			{/* Amount and Position Inputs */}
			<View style={styles.row}>
				<View style={styles.itemInner}>
					<Text style={styles.subtitle}>Amount</Text>
					<TextInput
						style={styles.input}
						placeholder={`$${shift.amount}`}
						keyboardType='decimal-pad'
						returnKeyType='done'
						onChangeText={(text) => onAmountChange(text)}
						value={data.amount}
					/>
				</View>
				<View style={styles.itemInner}>
					<Text style={styles.subtitle}>Position</Text>
					<TouchableOpacity style={styles.input}>
						<Text>{job.jobTitle}</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* In and Out Times */}
			{hoursToggled ? (
				<View>
					<Text style={styles.subtitle}>Hours worked</Text>
					<TextInput
						placeholder='4.5'
						// autoFocus={true}
						keyboardType='decimal-pad'
						style={
							Platform.OS === 'ios'
								? [styles.earningsIOS, styles.input]
								: styles.earningsAndroid
						}
						onChangeText={(text) => onHoursChange(text)}
						value={shift.hours}
					/>
				</View>
			) : (
				<View style={styles.row}>
					<View style={styles.itemInner}>
						<Text style={styles.subtitle}>Clocked in</Text>
						<TouchableOpacity onPress={showInTimePicker} style={styles.input}>
							<Text>
								{shift.inTime !== ''
									? moment(shift.inTime).format('hh:mm a')
									: 'In Time'}
							</Text>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isInTimePickerVisible}
							mode='time'
							onConfirm={handleInTimeConfirm}
							onCancel={hideInTimePicker}
						/>
					</View>

					<View style={styles.itemInner}>
						<Text style={styles.subtitle}>Clocked out</Text>
						<TouchableOpacity onPress={showOutTimePicker} style={styles.input}>
							<Text>
								{shift.outTime !== ''
									? moment(shift.outTime).format('hh:mm a')
									: 'Out Time'}
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
			)}
			<View
				style={{
					flex: 1,
					flexDirection: `row`,
					alignItems: `center`,
					justifyContent: `flex-end`,
					marginTop: 10,
					marginBottom: 10,
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

			{/* Tag Input */}
			<Text style={styles.subtitle}>Add a tag</Text>
			<View
				style={[
					{
						flexDirection: `row`,
						marginBottom: 5,
					},
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
					style={{ flex: 1, justifyContent: `center`, alignItems: `flex-end` }}
				>
					<TouchableOpacity onPress={handleCreateTag}>
						<AntDesign name='plus' size={24} color='blue' />
					</TouchableOpacity>
				</View>
			</View>

			<Text>Tags</Text>
			<SafeAreaView style={{ height: 80, marginTop: 5 }}>
				<ScrollView horizontal={true}>
					{shift.tags.length !== 0 &&
						_.map(shift.tags, (tag) => {
							return <ShiftTag key={tag} text={tag} />;
						})}
				</ScrollView>
			</SafeAreaView>

			<View style={styles.buttons}>
				<TouchableOpacity
					style={[styles.button, styles.saveButton]}
					onPress={() => handleEditShift(data)}
				>
					<Text style={{ color: `white` }}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.closeButton]}
					onPress={() => setEditModal(false)}
				>
					<Text>Close</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.75,
		justifyContent: `space-between`,
	},
	tag: {
		borderWidth: 1,
		padding: 2,
		borderRadius: 5,
		marginRight: 5,
	},
	title: {
		textAlign: `center`,
	},
	subtitle: {
		fontWeight: 'bold',
	},
	buttons: {
		width: `100%`,
		flexDirection: `row`,
		justifyContent: `space-evenly`,
	},
	button: {
		paddingTop: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 5,
		borderRadius: 5,
	},
	closeButton: {
		borderWidth: 1,
		borderColor: `lightgrey`,
	},
	saveButton: {
		backgroundColor: `#80ED99`,
	},
	row: {
		width: `100%`,
		flexDirection: `row`,
		marginBottom: 15,
	},
	column: {
		width: `100%`,
		marginBottom: 15,
	},
	itemAlignLeft: {
		justifyContent: 'flex-start',
	},
	itemInner: {
		flex: 1,
		marginRight: 10,
	},
	itemOuter: {},
	timeText: {
		textAlign: `left`,
	},

	input: {
		borderWidth: 1,
		borderColor: `#A2A7A5`,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	rowComponent: {
		flex: 1,
	},
	rowFiller: {
		flex: 0.1,
	},
});

export default EditShift;
