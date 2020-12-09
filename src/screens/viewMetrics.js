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
	const [daily, setDaily] = useState({});
	const [weekly, setWeekly] = useState({});
	const [monthly, setMonthly] = useState({});
	const [yearly, setYearly] = useState({});
	const [lifetime, setLifetime] = useState({});
	const [topAmount, setTopAmount] = useState({});
	const [topHours, setTopHours] = useState({});
	const [topHourly, setTopHourly] = useState({});

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		console.log(`viewMetrics: fetching shifts`);
		getShifts();
		console.log(`viewMetrics: fetching jobs`);
		getJobs();
	}, []);

	// calculate lifetime metrics
	useEffect(() => {
		var lifetimeAmount = 0.0;
		var lifetimeHours = 0.0;
		var lifetimeHourly = 0.0;
		var topAmount = 0.0;
		var topHours = 0.0;
		var topHourly = 0.0;

		if (shifts.length !== 0) {
			_.map(shifts, (shift) => {
				// calculate lifetime metrics
				let amount = parseFloat(shift.amount);
				let hours = parseFloat(shift.hours);
				let hourly = amount / hours;

				// find the most amount
				if (topAmount < amount) {
					topAmount = amount;
					setTopAmount({ ...shift });
				}

				// find the most hours
				if (topHours < hours) {
					topHours = hours;
					setTopHours({ ...shift });
				}

				// add amount if it exists, if not then its an hourly based job
				if (shift.amount) {
					lifetimeAmount += amount;

					// calculate hourly and compare to current highest hourly
					let tempHourly = amount / hours;
					if (topHourly < tempHourly) {
						topHourly = tempHourly;
						setTopHourly({ ...shift, hourly: topHourly.toFixed(1) });
					}
				}

				if (shift.hours) {
					lifetimeHours += hours;
				}
			});

			lifetimeHourly = lifetimeAmount / lifetimeHours;
			setLifetime({
				amount: lifetimeAmount.toFixed(2),
				hours: lifetimeHours.toFixed(1),
				hourly: lifetimeHourly.toFixed(1),
			});
		}
	}, [shifts]);

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

	console.log(`Top Amount: ${JSON.stringify(topAmount)}`);
	return (
		<View style={styles.container}>
			{/* Top metrics */}
			<View>
				{/* Top Row */}
				<Text style={styles.title}>Top Metrics</Text>
				<View style={styles.row}>
					<MetricComponent
						title='Earnings'
						value={`$${topAmount.amount}`}
						date={`${topAmount.createdAt}`}
					/>
					<MetricComponent
						title='Hourly'
						value={`${topHourly.hourly} /hr`}
						date={`${topHourly.createdAt}`}
					/>
					<MetricComponent
						title='Hours'
						value={`${topHours.hours}`}
						date={`${topHours.createdAt}`}
					/>
				</View>

				{/* Lifetime Row */}
				<Text style={styles.title}>Lifetime Metrics</Text>
				<View style={styles.row}>
					<MetricComponent
						title='Earnings'
						value={`$${lifetime.amount}`}
						date={null}
					/>
					<MetricComponent
						title='Hourly'
						value={`${lifetime.hourly} /hr`}
						date={null}
					/>
					<MetricComponent
						title='Hours'
						value={`${lifetime.hours} hrs`}
						date={null}
					/>
				</View>
			</View>

			{/* Summary metrics */}
			<View>
				<Text style={styles.title}>Summary</Text>
				{/* Daily */}
				<View style={styles.summaryBlock}>
					<Text style={styles.summaryButton}>[Daily Button]</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$180' />
						<SummaryMetric title='Hourly' value='17.4 /hr' />
						<SummaryMetric title='Hours' value='10.38 hrs' />
					</View>
				</View>

				{/* Weekly */}
				<View style={styles.summaryBlock}>
					<Text style={styles.summaryButton}>[Weekly Button]</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$501' />
						<SummaryMetric title='Hourly' value='17.74 /hr' />
						<SummaryMetric title='Hours' value='28.23 hrs' />
					</View>
				</View>

				{/* Monthly */}
				<View style={styles.summaryBlock}>
					<Text style={styles.summaryButton}>[Monthly Button]</Text>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value='$2004' />
						<SummaryMetric title='Hourly' value='17.74 /hr' />
						<SummaryMetric title='Hours' value='112.92 hrs' />
					</View>
				</View>

				{/* Yearly */}
				<View style={styles.summaryBlock}>
					<Text style={styles.summaryButton}>[Year Button]</Text>
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
		paddingLeft: 10,
		paddingRight: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: `500`,
	},
	row: {
		flexDirection: `row`,
		justifyContent: `space-around`,
	},
	summaryBlock: {
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 10,
		paddingBottom: 10,
	},
	summaryButton: {
		color: `#4392F1`,
		marginBottom: 5,
	},
});

export default ViewMetrics;
