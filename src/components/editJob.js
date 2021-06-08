import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Platform,
} from 'react-native';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Context as JobsContext } from '../context/JobsContext';

const EditJob = ({ route, navigation }) => {
	// context
	const { removeJob } = useContext(JobsContext);
	// state
	const [data, setData] = useState({
		id: '',
		jobTitle: '',
		jobWage: '',
		storeName: '',
		storeAddress: {
			address_line1: '',
			address_line2: '',
			address_state: '',
			city: '',
			zip: '',
			country: '',
		},
	});
	const [newData, setNewData] = useState({
		jobTitle: '',
		jobWage: '',
		storeName: '',
	});
	const [newStoreAddress, setNewStoreAddress] = useState({
		storeAddress: {
			address_line1: '',
			address_line2: '',
			address_state: '',
			city: '',
			zip: '',
			country: '',
		},
	});
	const [formError, setFormError] = useState('');

	// set up form with incoming route data
	useEffect(() => {
		if (!_.isEmpty(route.params)) {
			const { id, jobTitle, jobWage, storeName, storeAddress } = route.params.job;
			setData({
				id,
				jobTitle,
				jobWage,
				storeName,
				storeAddress,
			});
		}
	}, [route.params]);

	// handle submit button
	const handleSubmit = () => {
		console.log(`editJob submit button pressed`);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('CurrentJobs')}>
					<Ionicons name='md-close' size={32} color='black' />
				</TouchableOpacity>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView style={styles.body}>
						<View style={styles.titleRow}>
							<Text style={styles.title}>Edit Job</Text>
							<TouchableOpacity 
								style={styles.deleteBtn} 
								onPress={() => removeJob(data.id, () => navigation.navigate('CurrentJobs'))}
							>
								<Ionicons name="md-trash" size={24} color="#EF476F" />
								<Text style={styles.deleteText}>Delete</Text>
							</TouchableOpacity>
						</View>
						
						<View style={styles.row}>
							<Text style={styles.subtitle}>Title</Text>
							<TextInput
								style={styles.input}
								placeholder={data.jobTitle}
								value={newData.jobTitle}
								onChangeText={(text) =>
									setNewData({ ...newData, jobTitle: text })
								}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtitle}>Wage</Text>
							<TextInput
								style={styles.input}
								placeholder={`$${data.jobWage.toString()}.00`}
								keyboardType='decimal-pad'
								value={newData.jobWage}
								onChangeText={(text) =>
									setNewData({ ...newData, jobWage: text })
								}
							/>
						</View>
						<View style={styles.row}>
							<Text style={styles.subtitle}>Store</Text>
							<TextInput
								style={styles.input}
								placeholder={data.storeName}
								value={newData.storeName}
								onChangeText={(text) =>
									setNewData({ ...newData, storeName: text })
								}
							/>
						</View>
						<View style={styles.rowLarge}>
							<Text style={styles.subtitle}>Address</Text>
							<Text>Street 1</Text>
							<TextInput
								style={styles.input}
								placeholder={data.storeAddress.address_line1}
								value={newStoreAddress.address_line1}
								onChangeText={(text) =>
									setNewStoreAddress({
										...newStoreAddress,
										address_line1: text,
									})
								}
							/>
							<Text>Street 2</Text>
							<TextInput
								style={styles.input}
								placeholder={data.storeAddress.address_line2}
								value={newStoreAddress.address_line2}
								onChangeText={(text) =>
									setNewStoreAddress({
										...newStoreAddress,
										address_line2: text,
									})
								}
							/>
							<Text>City</Text>
							<TextInput
								style={styles.input}
								placeholder={data.storeAddress.city}
								value={newStoreAddress.city}
								onChangeText={(text) =>
									setNewStoreAddress({
										...newStoreAddress,
										city: text,
									})
								}
							/>
							<Text>State</Text>
							<TextInput
								style={styles.input}
								placeholder={data.storeAddress.address_state}
								value={newStoreAddress.address_state}
								onChangeText={(text) =>
									setNewStoreAddress({
										...newStoreAddress,
										address_state: text,
									})
								}
							/>

							<Text>Zip</Text>
							<TextInput
								style={styles.input}
								placeholder={data.storeAddress.address_zip}
								value={newStoreAddress.address_zip}
								onChangeText={(text) =>
									setNewStoreAddress({
										...newStoreAddress,
										address_zip: text,
									})
								}
							/>
						</View>
						<View style={styles.btnContainer}>
							<TouchableOpacity onPress={handleSubmit} style={styles.btn}>
								<Text style={styles.btnText}>Save</Text>
							</TouchableOpacity>
						</View>
						{formError !== '' && (
							<Text style={{ color: `red` }}>{formError}</Text>
						)}
						<View style={styles.hardFiller} />
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	hardFiller: {
		height: Platform.OS === 'ios' ? 100 : 200,
	},
	container: {
		flex: 1,
		justifyContent: `flex-start`,
		padding: 12,
	},
	title: {
		fontSize: 36,
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
	},
	header: {
		flex: 0.1,
		width: `100%`,
		justifyContent: `center`,
		alignItems: `flex-start`,
	},
	body: {
		flex: 1,
	},
	input: {
		borderWidth: 1,
		borderColor: `#A2A7A5`,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	row: {
		flex: 1,
	},
	titleRow: {
		flex: 1,
		flexDirection: `row`,
		justifyContent: `space-between`
	},
	rowLarge: {
		flex: 4,
	},
	btnContainer: {
		marginTop: 12,
		flex: 1,
	},
	btnText: {
		color: `white`,
	},
	btn: {
		padding: 10,
		backgroundColor: `#06D6A0`,
		alignItems: `center`,
		borderRadius: 2.5,
	},
	deleteBtn: {
		flexDirection: `row`,
		justifyContent: `flex-end`,
		alignItems: `center`
	},
	deleteText: {
		color: `#EF476F`,
		fontSize: 18,
		marginLeft: 8
	}
});

export default EditJob;
