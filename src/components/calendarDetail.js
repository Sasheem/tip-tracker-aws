import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteShift, updateShift } from '../graphql/mutations';

const CalendarDetail = ({ currentDetail, jobs }) => {
	// console.log(`currentDetail => ${JSON.stringify(currentDetail)}`);
	const shifts = Object.entries(currentDetail);
	// console.log(`currentDetail => shifts: ${JSON.stringify(shifts)}`);
	const [modalVisible, setModalVisible] = useState(false);

	const handleDeleteShift = () => {
		// prepare data
		const input = {
			id: currentDetail[Object.keys(currentDetail)[0]].id,
		};

		// delete from backend
		API.graphql(graphqlOperation(deleteShift, { input }));

		// close modal
		setModalVisible(false);
	};

	return (
		<View style={styles.detailerContainer}>
			{Object.keys(currentDetail).length !== 0 && (
				<View style={styles.header}>
					<Text style={styles.headerText}>
						{currentDetail[Object.keys(currentDetail)[0]].createdAt}
					</Text>
					<TouchableOpacity
						style={{ color: `red`, flex: 0.5 }}
						onPress={() => setModalVisible(true)}
					>
						<Text>Delete</Text>
					</TouchableOpacity>
				</View>
			)}

			<Swiper showsButtons={true}>
				{_.map(shifts, (item) => {
					const { id, amount, hours, tags, job } = item[1];
					var jobResult = null;

					// calculate the hourly if it exists
					var hourly =
						(amount !== null) & (hours !== null)
							? parseFloat(amount) / parseFloat(hours)
							: 0.0;

					// match job id to get job data
					if (job !== null) {
						jobResult = _.find(jobs, (jobItem) => jobItem.id === job);
					}

					return (
						<View key={id} style={styles.content}>
							<Modal
								animationType='slide'
								transparent={true}
								visible={modalVisible}
							>
								<View style={styles.centeredContainer}>
									<View style={styles.modalContainer}>
										<Text>Are you sure you want to delete this shift?</Text>
										<View style={styles.modalButtonContainer}>
											<TouchableOpacity
												style={styles.modalButton}
												onPress={handleDeleteShift}
											>
												<Text>Yes</Text>
											</TouchableOpacity>
											<TouchableOpacity
												style={styles.modalButton}
												onPress={() => {
													setModalVisible(!modalVisible);
												}}
											>
												<Text>No</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</Modal>
							<View style={styles.topRow}>
								<View>
									<Text>Amount</Text>
									<Text>
										$
										{jobResult !== null && jobResult.jobWage > 5.54
											? jobResult.jobWage * parseFloat(hours)
											: amount}
									</Text>
									{/* <Text>${amount !== null && amount}</Text> */}
								</View>
								<View>
									<Text>Hours</Text>
									<Text>{hours !== null && hours}</Text>
								</View>
								<View>
									<Text>Hourly</Text>
									<Text>
										{jobResult !== null && jobResult.jobWage > 5.54
											? jobResult.jobWage
											: hourly.toFixed(2)}{' '}
										/hr
									</Text>
								</View>
							</View>
							<View style={styles.bottomRow}>
								<View style={{ flex: 1 }}>
									<Text>Job</Text>
									<Text>{jobResult !== null && jobResult.jobTitle}</Text>
								</View>
								<View style={{ flex: 2 }}>
									<Text>Tags</Text>
									<View style={styles.tagsContainer}>
										{_.map(tags, (tag) => {
											return (
												<Text
													key={tag}
													style={{
														borderWidth: 1,
														padding: 2,
														borderRadius: 5,
														marginRight: 5,
													}}
												>
													{tag}
												</Text>
											);
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
		flex: 1,
	},
	header: {
		flex: 0.5,
		flexDirection: `row`,
		alignItems: `center`,
	},
	headerText: {
		fontSize: 24,
		flex: 3,
		textAlign: `center`,
	},
	body: {
		flexDirection: `row`,
		flex: 2,
		backgroundColor: `lightblue`,
	},
	content: {
		flex: 1,
		paddingLeft: 40,
		paddingRight: 40,
	},
	nav: {
		flex: 0.25,
		justifyContent: `center`,
		alignItems: `center`,
	},
	topRow: {
		flex: 1,
		flexDirection: `row`,
		justifyContent: `space-between`,
	},
	bottomRow: {
		flex: 1,
		flexDirection: `row`,
	},
	tagsContainer: {
		flexDirection: `row`,
		flexWrap: `wrap`,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalContainer: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	modalButtonContainer: {
		width: `100%`,
		flexDirection: `row`,
		justifyContent: `space-evenly`,
	},
});

export default CalendarDetail;
