import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import _ from 'lodash';
import { useState } from 'react/cjs/react.development';

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

	const onAmountChange = (text) => {
		setFormError('');
		setData({ ...data, amount: text });
	};

	return (
		<View style={styles.container}>
			<Text>{shift.createdAt}</Text>
			<Text>Amount</Text>
			<TextInput
				placeholder={`$${shift.amount}`}
				keyboardType='decimal-pad'
				returnKeyType='done'
				onChangeText={(text) => onAmountChange(text)}
				value={data.amount}
			/>
			<Text>Hours</Text>
			<Text>{shift.hours}</Text>
			<Text>Job Title</Text>
			<Text>{job.jobTitle}</Text>
			<Text>Shift Tags</Text>
			{_.map(shift.tags, (tag) => {
				return <Text key={tag}>{tag}</Text>;
			})}
			<View style={styles.buttons}>
				<TouchableOpacity
					style={[styles.button, styles.closeButton]}
					onPress={() => setEditModal(false)}
				>
					<Text>Close</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.saveButton]}
					onPress={() => handleEditShift(data)}
				>
					<Text style={{ color: `white` }}>Save</Text>
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
	buttons: {
		width: `100%`,
		flexDirection: `row`,
		justifyContent: `space-evenly`,
		marginTop: 40,
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
});

export default EditShift;
