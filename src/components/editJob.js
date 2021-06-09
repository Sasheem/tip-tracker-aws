import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import { Context as JobsContext } from '../context/JobsContext';
import FormJob from './formJob';

const EditJob = ({ route, navigation }) => {
	// context
	const { state, editJob, removeJob } = useContext(JobsContext);
	// state
	const id = route.params.job.id;
	const jobItem = state.find((item) => item.id === id);
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

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('CurrentJobs')}>
					<Ionicons name='md-close' size={32} color='black' />
				</TouchableOpacity>
			</View>
			<FormJob 
				labels={{
					title: `Edit Job`,
					button: `Save`
				}}
				initFormValue={jobItem 
					? {
						jobTitle: jobItem.jobTitle,
						jobWage: jobItem.jobWage.toString(),
						storeName: jobItem.storeName,
						storeAddress: jobItem.storeAddress
					}
					: data
				}
				onSubmit={(title, wage, name, address) => {
					editJob(id, title, wage, name, address, () => navigation.pop())
				}}
				onDelete={() => {
					removeJob(id, () => navigation.pop())
				}}
				isEdit={true}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: `flex-start`,
		padding: 12,
	},
	header: {
		flex: 0.1,
		width: `100%`,
		justifyContent: `center`,
		alignItems: `flex-start`,
	},
});

export default EditJob;
