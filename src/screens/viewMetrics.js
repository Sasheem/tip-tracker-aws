import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import _ from 'lodash';

import { listJobs, listShifts } from '../graphql/queries';

import MetricComponent from '../components/metricComponent';
import SummaryMetric from '../components/summaryMetric';

/**
 * todo finish filling in dummy data for Summary Metrics UI
 * todo plan out the different algorithms needed to calculate each metric
 * ? Summary Metrics: account for data changing based on a variable for
 * ? Top Metrics: account for updates to shift via subscriptions
 */

const ViewMetrics = () => {
	const [shifts, setShifts] = useState([]);
	const [jobs, setJobs] = useState([]);

	// fetch shifts when component mounts and shifts state updates
	// useEffect(() => {
	// 	console.log(`viewMetrics: fetching shifts`);
	// 	getShifts();
	// 	console.log(`viewMetrics: fetching jobs`);
	// 	getJobs();
	// }, []);

	// helper function - fetch shifts
	const getShifts = async () => {
		const result = await API.graphql(graphqlOperation(listShifts));
		setShifts(result.data.listShifts.items);
	};

	// helper function - fetch jobs
	const getJobs = async () => {
		const result = await API.graphql(graphqlOperation(listJobs));
		setJobs(result.data.listJobs.items);
	};

	return (
		<View style={styles.container}>
			{/* Top metrics */}
			<View>
				{/* Top Row */}
				<Text>Top Metrics</Text>
				<View style={styles.row}>
					<MetricComponent title='Earnings' value='$320' date='11/2/20' />
					<MetricComponent title='Hourly' value='42.5/hr' date='5/4/20' />
					<MetricComponent title='Hours' value='11.5' date='9/2/20' />
				</View>

				{/* Lifetime Row */}
				<Text>Lifetime Metrics</Text>
				<View style={styles.row}>
					<MetricComponent title='Earnings' value='$70205' date={null} />
					<MetricComponent title='Hourly' value='18.6/hr' date={null} />
					<MetricComponent title='Hours' value='3840' date={null} />
				</View>
			</View>

			{/* Summary metrics */}
			<View>
				<Text>Summary</Text>
				{/* Daily */}
				<View style={styles.summaryBlock}>
					<Text>11/28/20</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$180' />
						<SummaryMetric title='Hourly' value='17.4 /hr' />
						<SummaryMetric title='Hours' value='10.38 hrs' />
					</View>
				</View>

				{/* Weekly */}
				<View style={styles.summaryBlock}>
					<Text>[Weekly Title]</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$501' />
						<SummaryMetric title='Hourly' value='17.74 /hr' />
						<SummaryMetric title='Hours' value='28.23 hrs' />
					</View>
				</View>

				{/* Monthly */}
				<View style={styles.summaryBlock}>
					<Text>[Monthly Title]</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$2004' />
						<SummaryMetric title='Hourly' value='17.74 /hr' />
						<SummaryMetric title='Hours' value='112.92 hrs' />
					</View>
				</View>

				{/* Yearly */}
				<View style={styles.summaryBlock}>
					<Text>[Year Title]</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$2004' />
						<SummaryMetric title='Hourly' value='17.74 /hr' />
						<SummaryMetric title='Hours' value='112.92 hrs' />
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	row: {
		backgroundColor: `pink`,
		flexDirection: `row`,
		justifyContent: `space-around`,
	},
	summaryBlock: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 10,
		paddingBottom: 10,
	},
});

export default ViewMetrics;
