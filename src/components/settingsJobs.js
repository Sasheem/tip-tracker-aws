import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';

import { listJobs } from '../graphql/queries';

const SettingsJobs = ({ navigation }) => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		console.log(`fetching jobs`);
		getJobs();
	}, []);

	// fetch jobs
	const getJobs = async () => {
		const result = await API.graphql(graphqlOperation(listJobs));
		setJobs(result.data.listJobs.items);
	};

	return (
		<View style={styles.container}>
			<Text>Jobs</Text>
			<View style={styles.tableHead}>
				<Text style={styles.tableText}>Title</Text>
				<Text style={styles.tableText}>Wage</Text>
				<Text style={styles.tableText}>Store</Text>
				<View />
			</View>
			<View style={styles.tableBody}>
				{jobs.length !== 0 ? (
					_.map(jobs, (job) => (
						<TouchableOpacity
							key={job.id}
							style={styles.jobs}
							onPress={() => console.log('show modal with data to edit job')}
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
		paddingLeft: 5,
		paddingRight: 5,
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
		justifyContent: `flex-start`,
	},
	tableText: {
		textAlign: `left`,
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
		backgroundColor: `lightblue`,
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
