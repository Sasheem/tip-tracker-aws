import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
	Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';

import { Context as JobsContext } from '../context/JobsContext';
import EditJob from './editJob';

const SettingsJobs = ({ navigation }) => {
	// context
	const { state: fetchedJobs, getJobs } = useContext(JobsContext);
	// state
	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

	useEffect(() => {
		console.log(`fetching jobs`);
		getJobs();
		// listen for when this component ViewCalendar gains focus or
        // becomes the primary component on the screen
		const unsubscribe = navigation.addListener('focus', e => {
			console.log(`tab pressed getting shifts`);
			getJobs();
		})

		// clean up
        // tell react-navigation we don't need to listen anymore
		return unsubscribe;
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.tableHead}>
				<View style={styles.tableFiller} />
				<Text style={styles.tableText}>Title</Text>
				<Text style={styles.tableText}>Wage</Text>
				<Text style={styles.tableText}>Store</Text>
				<View style={styles.tableFiller} />
			</View>
			<View style={styles.tableBody}>
				{fetchedJobs.length !== 0 ? (
					_.map(fetchedJobs, (job) => (
						<TouchableOpacity
							key={job.id}
							style={styles.jobs}
							onPress={() => navigation.navigate('EditJob', { job })}
						>
							<Text style={styles.tableText}>{job.jobTitle}</Text>
							<Text style={styles.tableText}>{job.jobWage}</Text>
							<Text style={styles.tableText}>{job.storeName}</Text>
							<View>
								<AntDesign name='right' size={24} color='black' />
							</View>
						</TouchableOpacity>
					))
				) : (
					<View style={[styles.activityContainer, styles.activityHorizontal]}>
						<ActivityIndicator size='large' color='#00ff00' />
					</View>
				)}
			</View>

			<View style={styles.addJobContainer}>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => navigation.navigate('CreateJobModal')}
				>
					<AntDesign name='plus' color='white' size={32} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		flex: 1,
		justifyContent: `space-between`,
	},
	addJobContainer: {
		flex: 0.25,
		justifyContent: `flex-end`,
		alignItems: `flex-end`,
		padding: 32,
		zIndex: 3,
	},
	tableHead: {
		paddingBottom: 10,
		flex: 0.25,
		flexDirection: `row`,
		justifyContent: `space-between`,
		alignItems: `flex-end`,
		borderBottomWidth: 2,
		borderBottomColor: `black`,
	},
	tableBody: {
		flex: 2,
	},
	tableText: {
		textAlign: `left`,
		flex: 1,
	},
	tableFiller: {
		flex: 0.1,
	},
	jobs: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 20,
		paddingBottom: 20,
		flexDirection: `row`,
		justifyContent: `space-between`,
		alignItems: `center`,
		borderBottomWidth: 0.5,
		borderBottomColor: `lightgrey`,
	},
	addButton: {
		borderRadius: 50,
		backgroundColor: `#39A0ED`,
		padding: 8,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	activityContainer: {
		flex: 1,
		justifyContent: `center`,
	},
	activityHorizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10,
	},
});

export default SettingsJobs;
