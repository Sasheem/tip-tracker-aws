import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import _ from 'lodash';

const CalendarDetail = ({ currentDetail }) => {
	const shifts = Object.entries(currentDetail);

	return (
		<View style={styles.detailerContainer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{Object.keys(currentDetail).length !== 0 &&
						currentDetail[Object.keys(currentDetail)[0]].createdAt}
				</Text>
			</View>
			<Swiper>
				{shifts.map((item) => {
					const { id, amount, hours, tags } = item[1];

					console.log(`amount: ${amount}`);
					var hourly =
						(amount !== null) & (hours !== null)
							? parseFloat(amount) / parseFloat(hours)
							: 0.0;

					return (
						<View key={id} style={styles.content}>
							<View style={styles.topRow}>
								<View>
									<Text>Amount</Text>
									<Text>{amount !== null && amount}</Text>
								</View>
								<View>
									<Text>Hours</Text>
									<Text>{hours !== null && hours}</Text>
								</View>
								<View>
									<Text>Hourly</Text>
									<Text>{hourly.toFixed(2)}</Text>
								</View>
							</View>
							<View style={styles.bottomRow}>
								<View>
									<Text>Job</Text>
									<Text>jobTitle</Text>
								</View>
								<View>
									<Text>Tags</Text>
									<View style={styles.tagsContainer}>
										{console.log(JSON.stringify(tags))}
										{_.map(tags, (tag) => {
											return <Text key={tag}>{tag}</Text>;
										})}
									</View>
								</View>
							</View>
						</View>
					);
				})}
			</Swiper>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {},
	detailerContainer: {
		backgroundColor: `pink`,
		flex: 1,
	},
	header: {
		flex: 0.5,
		justifyContent: `center`,
		alignItems: `center`,
		backgroundColor: `lightgreen`,
	},
	headerText: {
		fontSize: 24,
	},
	body: {
		flexDirection: `row`,
		flex: 2,
		backgroundColor: `lightblue`,
	},
	content: {
		flex: 1,
	},
	nav: {
		flex: 0.25,
		justifyContent: `center`,
		alignItems: `center`,
	},
	topRow: {
		flex: 1,
		flexDirection: `row`,
		justifyContent: `space-evenly`,
	},
	bottomRow: {
		flex: 1,
		flexDirection: `row`,
		justifyContent: `space-evenly`,
	},
	tagsContainer: {
		flexDirection: `row`,
		justifyContent: `space-evenly`,
	},
});

export default CalendarDetail;
