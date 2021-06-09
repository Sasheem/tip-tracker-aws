import React, { useContext } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';


import { Context as JobsContext } from '../context/JobsContext';
import FormJob from './formJob';

/**
 *
 * @param {navigation} param0
 * ? object to handle navigation
 *
 * todo add error checking to handleSubmit DONE
 * todo make api call to add form add as job DONE
 * todo combine similar form styling into separate file - POST LAUNCH PRIORITY
 * ? see createShift component for similar styling
 * todo add a subscription to update jobs array
 */

const CreateJob = ({ navigation }) => {
	// context
	const { addJob } = useContext(JobsContext); 

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('CurrentJobs')}>
					<AntDesign name='close' size={32} color='black' />
				</TouchableOpacity>
			</View>
			<FormJob 
				labels={{
					title: `Add a job`,
					button: `Add`
				}}
				initFormValue={{
					jobTitle: ``,
					jobWage: ``,
					storeName: ``,
					storeAddress: {
						city: '',
						country: 'USA',
						address_line1: '',
						address_line2: '',
						address_state: '',
						address_zip: '',
					}
				}}
				onSubmit={(title, wage, name, address) => {
					addJob(title, wage, name, address, () => navigation.navigate('CurrentJobs'))
				}}
				isEdit={false}
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

export default CreateJob;
