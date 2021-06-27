import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DetailEmpty = ({ date, navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{date}</Text>
			<TouchableOpacity
				style={styles.buttonContainer}
				onPress={() => navigation.navigate('Shift', { currentDate: date })}
			>
				<Text style={styles.buttonText}>Add shift</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: `center`,
		alignItems: `center`,
	},
	title: {
		fontSize: 24,
		marginBottom: 50,
	},
	buttonContainer: {
		padding: 10,
		backgroundColor: `#39A0ED`,
		alignItems: `center`,
		borderRadius: 2.5,
	},
	buttonText: {
		color: `white`,
		fontSize: 16,
		fontWeight: `500`,
	},
});

export default DetailEmpty;
