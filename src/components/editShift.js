import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Button,
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
			<Text>{shift.createdAt}</Text>
			<View style={styles.row}>
				<View style={styles.itemInner}>
					<Text style={styles.subtitle}>Amount</Text>
					<TextInput
						placeholder={`$${shift.amount}`}
						keyboardType='decimal-pad'
						returnKeyType='done'
						onChangeText={(text) => onAmountChange(text)}
						value={data.amount}
					/>
				</View>
				<View style={styles.itemInner}>
					<Text style={styles.subtitle}>Position</Text>
					<Text>{job.jobTitle}</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.itemInner}>
					<Text style={styles.subtitle}>In Time</Text>
					<TouchableOpacity onPress={() => setInTimePickerVisibility(true)}>
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
						onCancel={() => setInTimePickerVisibility(false)}
					/>
				</View>

				<View style={styles.itemInner}>
					<Text style={styles.subtitle}>Out Time</Text>
					<TouchableOpacity onPress={() => setOutTimePickerVisibility(true)}>
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
						onCancel={() => setOutTimePickerVisibility(false)}
					/>
				</View>
			</View>
			<View>
				<Text>Hours</Text>
				<TextInput
					placeholder={`${shift.hours} hrs`}
					keyboardType='decimal-pad'
					returnKeyType='done'
					onChangeText={(text) => onHoursChange(text)}
					value={data.hours}
				/>
			</View>
			<Text style={styles.subtitle}>Add a tag</Text>
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

			<Text>Tags</Text>
			<SafeAreaView style={{ height: 80 }}>
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
		flex: 0.5,
		justifyContent: `space-between`,
	},
	tag: {
		borderWidth: 1,
		padding: 2,
		borderRadius: 5,
		marginRight: 5,
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
	},
	itemAlignLeft: {
		justifyContent: 'flex-start',
	},
	itemInner: {
		flex: 1,
	},
	itemOuter: {},
	timeText: {
		textAlign: `left`,
	},
});

export default EditShift;
