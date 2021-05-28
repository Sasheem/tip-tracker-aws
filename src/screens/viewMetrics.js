import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons';

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
	const [dailyLabel, setDailyLabel] = useState(moment().format('MM-DD-YYYY'));
	const [daily, setDaily] = useState({});
	const [weeklyLabel, setWeeklyLabel] = useState(moment().format('w'));
	const [weekly, setWeekly] = useState({});
	const [monthlyLabel, setMonthlyLabel] = useState(moment().format('MMMM'));
	const [monthlyMonthLabel, setMonthlyMonthLabel] = useState('');
	const [monthlyYearLabel, setMonthlyYearLabel] = useState('');
	const [monthly, setMonthly] = useState({});
	const [yearlyLabel, setYearlyLabel] = useState(moment().format('YYYY'));
	const [yearly, setYearly] = useState({});
	const [lifetime, setLifetime] = useState({});
	const [topAmount, setTopAmount] = useState({});
	const [topHours, setTopHours] = useState({});
	const [topHourly, setTopHourly] = useState({});
	const [dailyItems, setDailyItems] = useState([]);
	const [weeklyItems, setWeeklyItems] = useState([]);
	const [monthlyItems, setMonthlyItems] = useState([]);
	const [yearlyItems, setYearlyItems] = useState([]);

	// fetch shifts when component mounts and shifts state updates
	useEffect(() => {
		getShifts();
		getJobs();
	}, []);

	/**
	 * todo get daily label to be set upon loading screen
	 */
	// set up daily items array for RNPickerSelect
	useEffect(() => {
		var daily = [];

		if (shifts.length !== 0) {
			const sortedShifts = _.sortBy(shifts, (shift) => shift.createdAt);
			console.log(
				`setting to last shift in sortedShifts: ${JSON.stringify(
					sortedShifts[sortedShifts.length - 1]
				)}`
			);

			_.map(_.reverse(sortedShifts), (shift) => {
				if (shift.amount) {
					daily.push({
						label: `${shift.createdAt}`,
						value: `${shift.createdAt}`,
					});
				}
			});

			// set daily to last of sortedShifts, aka most recent shift
			setDaily({ ...sortedShifts[sortedShifts.length - 1] });
		}
		setDailyItems(daily);
	}, [shifts]);

	/**
	 * todo pair the corresponding date range in the week label
	 */
	// set up weekly items array for RNPickerSelect
	useEffect(() => {
		var weekly = [];
		var weeklyStrings = [];

		if (shifts.length !== 0) {
			const sortedShifts = _.sortBy(shifts, (shift) => shift.createdAt);
			_.map(_.reverse(sortedShifts), (shift) => {
				var tempWeek = moment(shift.createdAt, 'MM-DD-YYYY').format('w');

				if (weeklyStrings.length === 0) {
					weeklyStrings.push(`Week ${tempWeek}`);
					weekly.push({ label: `Week ${tempWeek}`, value: tempWeek });
				} else {
					// check if tempWeek is NOT within weekly already
					if (!weeklyStrings.includes(`Week ${tempWeek}`)) {
						weeklyStrings.push(`Week ${tempWeek}`);
						weekly.push({
							label: `Week ${tempWeek}`,
							value: tempWeek,
						});
					}
				}
			});
		}
		setWeeklyItems(weekly);
	}, [shifts]);

	// set up monthly items array for RNPickerSelect
	useEffect(() => {
		var monthly = [];
		var monthlyStrings = [];

		// only perform if shifts is not empty
		if (shifts.length !== 0) {
			const sortedShifts = _.sortBy(shifts, (shift) => shift.createdAt);

			_.map(_.reverse(sortedShifts), (shift) => {
				var tempMonth = moment(shift.createdAt, 'MM-DD-YYYY').format('MMMM');
				var tempYear = moment(shift.createdAt, 'MM-DD-YYYY').format('YYYY');

				if (monthlyStrings.length === 0) {
					monthlyStrings.push(tempMonth);
					monthly.push({
						label: `${tempMonth} ${tempYear}`,
						value: `${tempMonth} ${tempYear}`,
					});
				} else {
					// check if tempMonth is not within monthly already
					if (!monthlyStrings.includes(tempMonth)) {
						monthlyStrings.push(tempMonth);
						monthly.push({
							label: `${tempMonth} ${tempYear}`,
							value: `${tempMonth} ${tempYear}`,
						});
					}
				}
			});
		}
		setMonthlyItems(monthly);
	}, [shifts]);

	// set up yearly items array for RNPickerSelect
	useEffect(() => {
		var yearly = [];
		var yearlyStrings = [];

		if (shifts.length !== 0) {
			const sortedShifts = _.sortBy(shifts, (shift) => shift.createdAt);
			_.map(_.reverse(sortedShifts), (shift) => {
				var tempYear = moment(shift.createdAt, 'MM-DD-YYYY').format('YYYY');

				if (yearlyStrings.length === 0) {
					yearlyStrings.push(tempYear);
					yearly.push({ label: tempYear, value: tempYear });
				} else {
					if (!yearlyStrings.includes(tempYear)) {
						yearlyStrings.push(tempYear);
						yearly.push({ label: tempYear, value: tempYear });
					}
				}
			});
		}
		setYearlyItems(yearly);
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
				amount: lifetimeAmount.toFixed(0),
				hours: lifetimeHours.toFixed(1),
				hourly: lifetimeHourly.toFixed(1),
			});
		}
	}, [shifts]);

	// filter metrics based on day with momentjs
	useEffect(() => {
		const result = _.filter(shifts, (shift) =>
			moment(dailyLabel, 'MM-DD-YYYY').isSame(shift.createdAt, 'day')
		);
		setDaily({ ...result[0] });
	}, [shifts, dailyLabel]);

	// filter metrics based on week with momentjs
	/**
	 * todo - 1) Does not yet handle case for hourly based job
	 * ? repeating code from calculate() b/c I an extra attr
	 * ? is for week label
	 *
	 * todo - 2) filter by year, I don't see it now but it will overlap the years
	 * todo - when november/december come around
	 */
	useEffect(() => {
		var totalAmount = 0.0;
		var totalHours = 0.0;
		var totalHourly = 0.0;
		const results = _.filter(shifts, (shift) => {
			// using == because one is a number and other is string, respectively
			return weeklyLabel == moment(shift.createdAt, 'MM-DD-YYYY').week();
		});

		if (results.length !== 0) {
			var weekNumber = moment(results[0].createdAt, 'MM-DD-YYYY').format('w');

			_.map(results, (shift) => {
				let amount = parseFloat(shift.amount !== '' ? shift.amount : '0.0');
				let hours = parseFloat(shift.hours);

				if (amount) {
					totalAmount += amount;
				}
				if (hours) {
					totalHours += hours;
				}
			});

			totalHourly = totalAmount / totalHours;

			setWeekly({
				amount: totalAmount.toFixed(2),
				hours: totalHours.toFixed(1),
				hourly: totalHourly.toFixed(1),
				label: `Week ${weekNumber}`,
			});
		}
	}, [shifts, weeklyLabel]);

	// filter metrics based on month with momentjs
	useEffect(() => {
		const results = _.filter(shifts, (shift) => {
			let monthTemp = moment(shift.createdAt).format('MMMM');
			let yearTemp = moment(shift.createdAt).format('YYYY');
			return monthTemp === monthlyMonthLabel && yearTemp == monthlyYearLabel;
		});
		setMonthly(calculate(results));
	}, [shifts, monthlyLabel]);

	// filter metrics based on year with momentjs
	useEffect(() => {
		const results = _.filter(shifts, (shift) =>
			moment(yearlyLabel, 'YYYY').isSame(shift.createdAt, 'year')
		);
		setYearly(calculate(results));
	}, [shifts, yearlyLabel]);

	// helper function - return calculated amount, hours, hourly in object
	const calculate = (shifts) => {
		var totalAmount = 0.0;
		var totalHours = 0.0;
		var totalHourly = 0.0;

		_.map(shifts, (shift) => {
			let amount = parseFloat(shift.amount !== '' ? shift.amount : '0');
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

	// helper function - set monthly
	const setMonthlyValues = (value) => {
		console.log(`value: ${value}`);
		if (value !== null) {
			setMonthlyLabel(value);
			var monthlySplit = value.split(' ');
			setMonthlyMonthLabel(monthlySplit[0]);
			setMonthlyYearLabel(monthlySplit[1]);
		}
	};

	return (
		<View style={styles.container}>
			{/* Top metrics */}
			<View>
				{/* Top Row */}
				<Text style={styles.title}>Top Metrics</Text>
				<View style={styles.flexRow}>
					<MetricComponent
						title='Earnings'
						value={`$${topAmount.amount}`}
						date={`${topAmount.createdAt}`}
					/>
					<View style={styles.flexFillSm} />
					<MetricComponent
						title='Hourly'
						value={topHourly.hourly}
						date={`${topHourly.createdAt}`}
					/>
					<View style={styles.flexFillSm} />
					<MetricComponent
						title='Hours'
						value={`${topHours.hours}`}
						date={`${topHours.createdAt}`}
					/>
				</View>

				{/* Lifetime Row */}
				<Text style={styles.title}>Lifetime Metrics</Text>
				<View style={styles.flexRow}>
					<MetricComponent
						title='Earnings'
						value={`$${lifetime.amount}`}
						date={null}
					/>
					<View style={styles.flexFillSm} />
					<MetricComponent title='Hourly' value={lifetime.hourly} date={null} />
					<View style={styles.flexFillSm} />
					<MetricComponent title='Hours' value={lifetime.hours} date={null} />
				</View>
			</View>

			{/* Summary metrics */}
			<View>
				<Text style={styles.title}>Summary</Text>
				{/* Daily */}
				<View style={styles.summaryBlock}>
					<RNPickerSelect
						placeholder={{
							label: 'Select a day',
							value: null,
						}}
						onValueChange={(value) => setDailyLabel(value)}
						items={dailyItems}
						value={dailyLabel}
						useNativeAndroidPickerStyle={false}
						Icon={() => <AntDesign name='down' size={20} color='#D1D5DE' />}
						style={pickerStyles}
					/>
					{daily.hours && (
						<View style={styles.flexRow}>
							<SummaryMetric title='Earnings' value={`$${daily.amount}`} />
							<View style={styles.flexFillSm} />
							<SummaryMetric
								title='Hourly'
								value={(
									parseFloat(daily.amount) / parseFloat(daily.hours)
								).toFixed(1)}
							/>
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hours' value={daily.hours} />
						</View>
					)}
				</View>

				{/* Weekly */}
				<View style={styles.summaryBlock}>
					<View>
						<RNPickerSelect
							placeholder={{
								label: 'Select a week',
								value: null,
							}}
							onValueChange={(value) => setWeeklyLabel(value)}
							items={weeklyItems}
							value={weeklyLabel}
							useNativeAndroidPickerStyle={false}
							Icon={() => <AntDesign name='down' size={20} color='#D1D5DE' />}
							style={pickerStyles}
						/>
					</View>

					{weekly.hours && (
						<View style={styles.flexRow}>
							<SummaryMetric title='Earnings' value={`$${weekly.amount}`} />
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hourly' value={weekly.hourly} />
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hours' value={weekly.hours} />
						</View>
					)}
				</View>

				{/* Monthly */}
				<View style={styles.summaryBlock}>
					<RNPickerSelect
						placeholder={{
							label: 'Select a month',
							value: null,
						}}
						onValueChange={(value) => setMonthlyValues(value)}
						items={monthlyItems}
						value={monthlyLabel}
						useNativeAndroidPickerStyle={false}
						Icon={() => <AntDesign name='down' size={20} color='#D1D5DE' />}
						style={pickerStyles}
					/>
					{monthly.hourly && monthly.hourly !== NaN && (
						<View style={styles.flexRow}>
							<SummaryMetric title='Earnings' value={`$${monthly.amount}`} />
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hourly' value={monthly.hourly} />
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hours' value={monthly.hours} />
						</View>
					)}
				</View>

				{/* Yearly */}
				<View style={styles.summaryBlock}>
					<RNPickerSelect
						placeholder={{
							label: 'Select a year',
							value: null,
						}}
						onValueChange={(value) => setYearlyLabel(value)}
						items={yearlyItems}
						value={yearlyLabel}
						useNativeAndroidPickerStyle={false}
						Icon={() => <AntDesign name='down' size={20} color='#D1D5DE' />}
						style={pickerStyles}
					/>
					{yearly.hours && (
						<View style={styles.flexRow}>
							<SummaryMetric title='Earnings' value={`$${yearly.amount}`} />
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hourly' value={yearly.hourly} />
							<View style={styles.flexFillSm} />
							<SummaryMetric title='Hours' value={yearly.hours} />
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 24,
	},
	headerText: {
		fontSize: 40,
		// paddingBottom: 24,
		textAlign: `left`,
	},
	title: {
		fontSize: 16,
		fontWeight: `500`,
	},
	flexRow: {
		flexDirection: `row`,
		marginBottom: Platform.OS === 'ios' ? 15 : 10,
		paddingTop: 5,
	},
	flexFillLarge: {
		flex: 2,
	},
	flexFillMed: {
		flex: 1.5,
	},
	flexFillReg: {
		flex: 1,
	},
	flexFillSm: {
		flex: 0.5,
	},
	row: {
		flexDirection: `row`,
		justifyContent: `space-around`,
		marginBottom: Platform.OS === 'ios' ? 15 : 10,
		paddingTop: 5,
	},
	summaryRow: {
		flexDirection: `row`,
		justifyContent: `space-between`,
		paddingHorizontal: 25,
		marginBottom: Platform.OS === 'ios' ? 15 : 10,
		paddingTop: 5,
	},
	summaryBlock: {
		paddingTop: 5,
	},
	summaryButton: {
		color: `#4392F1`,
		marginBottom: 5,
	},
});

const pickerStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 14,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
		marginBottom: 2,
		color: `gray`,
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'gray',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	iconContainer: {
		top: Platform.OS === 'ios' ? 8 : 12,
		right: 15,
	},
});

export default ViewMetrics;
