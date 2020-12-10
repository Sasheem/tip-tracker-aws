import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import _ from 'lodash';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

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
	const [dailyLabel, setDailyLabel] = useState(moment().format('MM-DD-YYYY'));
	const [weekly, setWeekly] = useState({});
	const [monthlyLabel, setMonthlyLabel] = useState(moment().format('MMMM'));
	const [monthly, setMonthly] = useState({});
	const [yearlyLabel, setYearlyLabel] = useState(moment().format('YYYY'));
	const [yearly, setYearly] = useState({});
	const [lifetime, setLifetime] = useState({});
	const [topAmount, setTopAmount] = useState({});
	const [topHours, setTopHours] = useState({});
	const [topHourly, setTopHourly] = useState({});
	const [dailyItems, setDailyItems] = useState([]);

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		getShifts();
		getJobs();
	}, []);

	// set up daily, weekly, monthly, and yearly arrays for RNPickerSelect
	useEffect(() => {
		var daily = [];
		// var weekly = [];
		// var monthly = [];
		// var yearly = [];

		if (shifts.length !== 0) {
			const sortedShifts = _.sortBy(shifts, (shift) => shift.createdAt);
			_.map(_.reverse(sortedShifts), (shift) => {
				if (shift.amount) {
					daily.push({
						label: `${shift.createdAt}`,
						value: `${shift.createdAt}`,
					});
				}
			});
		}

		setDailyItems(daily);
	}, [shifts]);

	// calculate lifetime and top metrics
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

	// filter metrics based on month with momentjs
	useEffect(() => {
		const results = _.filter(shifts, (shift) =>
			moment(monthlyLabel, 'MMMM').isSame(shift.createdAt, 'month')
		);
		setMonthly(calculate(results));
	}, [shifts, monthlyLabel]);

	// filter metrics based on year with momentjs
	useEffect(() => {
		const results = _.filter(shifts, (shift) =>
			moment(yearlyLabel, 'YYYY').isSame(shift.createdAt, 'year')
		);
		setYearly(calculate(results));
	}, [shifts, yearlyLabel]);

	// handle monthly date confirmed
	const handleDailyConfirm = (value) => {
		setDailyLabel(value);

		const result = _.filter(shifts, (shift) =>
			moment(value, 'MM-DD-YYYY').isSame(shift.createdAt, 'day')
		);
		setDaily({ ...result[0] });
	};

	// helper function - return calculated amount, hours, hourly in object
	const calculate = (shifts) => {
		var totalAmount = 0.0;
		var totalHours = 0.0;
		var totalHourly = 0.0;

		_.map(shifts, (shift) => {
			let amount = parseFloat(shift.amount);
			let hours = parseFloat(shift.hours);

			if (amount) {
				totalAmount += amount;
			}
			if (hours) {
				totalHours += hours;
			}
		});
		totalHourly = totalAmount / totalHours;

		return {
			amount: totalAmount.toFixed(2),
			hours: totalHours.toFixed(1),
			hourly: totalHourly.toFixed(1),
		};
	};

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

	/**
	 * todo construct this in useEffect based off shifts data
	 */
	// month values
	const monthValues = [
		{ label: 'November', value: 'November' },
		{ label: 'December', value: 'December' },
	];

	// year values
	const yearValues = [
		{ label: '2021', value: '2021' },
		{ label: '2020', value: '2020' },
		{ label: '2019', value: '2019' },
		{ label: '2018', value: '2018' },
	];

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
					{/* <Text>{dailyLabel}</Text> */}
					<RNPickerSelect
						onValueChange={(value) => handleDailyConfirm(value)}
						items={dailyItems}
						value={dailyLabel}
					/>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value={`$${daily.amount}`} />
						<SummaryMetric
							title='Hourly'
							value={` ${(
								parseFloat(daily.amount) / parseFloat(daily.hours)
							).toFixed(1)} /hr`}
						/>
						<SummaryMetric title='Hours' value={`${daily.hours} hrs`} />
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
					<RNPickerSelect
						onValueChange={(value) => setMonthlyLabel(value)}
						items={monthValues}
						value={monthlyLabel}
					/>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value={`$${monthly.amount}`} />
						<SummaryMetric title='Hourly' value={`${monthly.hourly} /hr`} />
						<SummaryMetric title='Hours' value={`${monthly.hours} hrs`} />
					</View>
				</View>

				{/* Yearly */}
				<View style={styles.summaryBlock}>
					<RNPickerSelect
						onValueChange={(value) => setYearlyLabel(value)}
						items={yearValues}
						value={yearlyLabel}
					/>
					<View style={styles.row}>
						<SummaryMetric title='Earnings' value={`$${yearly.amount}`} />
						<SummaryMetric title='Hourly' value={`${yearly.hourly} /hr`} />
						<SummaryMetric title='Hours' value={`${yearly.hours} hrs`} />
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
