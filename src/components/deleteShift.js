import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeleteShift = ({ handleDeleteShift, setDeleteModal }) => {
	return (
		<View>
			<Text style={styles.subtitle}>
				Are you sure you want to delete this shift?
			</Text>
			<View style={styles.buttons}>
				<TouchableOpacity
					style={[styles.button, styles.removeButton]}
					onPress={handleDeleteShift}
				>
					<Text style={{ color: `white` }}>Yes</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.closeButton]}
					onPress={() => {
						setDeleteModal(false);
					}}
				>
					<Text>No</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 16,
		textAlign: `center`,
		marginBottom: 50,
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
	removeButton: {
		backgroundColor: `#EF476F`,
	},
});

export default DeleteShift;
