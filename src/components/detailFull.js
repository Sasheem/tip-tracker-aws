import React, { useState, useContext } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Modal,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import _ from 'lodash';
import Swiper from 'react-native-swiper';

import { Context as ShiftsContext } from '../context/ShiftsContext';

import EditShift from './editShift';
import DeleteShift from './deleteShift';
import ShiftTag from './shiftTag';

const DetailFull = ({ currentDetail, jobs }) => {
	const { removeShift } = useContext(ShiftsContext);
	const shifts = Object.entries(currentDetail);
	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	console.log(`shifts length: ${shifts.length}`);

	const handleDeleteShift = () => {

		// run delete action
		removeShift(currentDetail[Object.keys(currentDetail)[0]].id);

		// close modal
		setDeleteModal(false);
	};

	const handleEditShift = () => {
		// compare data to find diff values
		// prepare input with this data

		// save edit to backend

		// close modal
		setEditModal(false);
	};
	return (
		<View style={{ flex: 1, flexDirection: `row` }}>
			<View style={styles.detailSpacing} />
			<View style={styles.detailContainer}>
				<View style={styles.header}>
					<TouchableOpacity
						style={{ flex: 0.5 }}
						onPress={() => setEditModal(true)}
					>
						<Text style={{ color: `#016FB9`, textAlign: `right` }}>Edit</Text>
					</TouchableOpacity>
					<Text style={styles.headerText}>
						{currentDetail[Object.keys(currentDetail)[0]].createdAt}
					</Text>
					<TouchableOpacity
						style={{ flex: 0.75 }}
						onPress={() => setDeleteModal(true)}
					>
						<Text style={{ color: `red`, textAlign: `left` }}>Delete</Text>
					</TouchableOpacity>
				</View>

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
									visible={editModal}
								>
									<View style={styles.centeredContainer}>
										<View style={styles.modalContainer}>
											<Text>Edit Shift</Text>
											<EditShift
												shift={item[1] ? item[1] : {}}
												job={jobResult}
												setEditModal={setEditModal}
												handleEditShift={handleEditShift}
											/>
										</View>
									</View>
								</Modal>
								<Modal
									animationType='slide'
									transparent={true}
									visible={deleteModal}
								>
									<View style={styles.centeredContainer}>
										<View style={styles.modalContainer}>
											<DeleteShift
												setDeleteModal={setDeleteModal}
												handleDeleteShift={handleDeleteShift}
											/>
										</View>
									</View>
								</Modal>
								<View style={styles.topRow}>
									<View style={styles.rowItemFlexOne}>
										<Text>Amount</Text>
										<Text>
											$
											{jobResult !== null && jobResult.jobWage > 5.54
												? jobResult.jobWage * parseFloat(hours)
												: amount}
										</Text>
									</View>
									<View style={styles.rowItemFlexOne}>
										<Text>Hours</Text>
										<Text>{hours !== null && hours}</Text>
									</View>
									<View style={styles.rowItemFlexOne}>
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
										<SafeAreaView>
											<ScrollView horizontal={true}>
												{_.map(tags, (tag) => {
													return (
														<ShiftTag key={tag} text={tag} forDetail={true} />
													);
												})}
											</ScrollView>
										</SafeAreaView>
									</View>
								</View>
							</View>
						);
					})}
				</Swiper>
			</View>
			<View style={styles.detailSpacing} />
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {},
	detailContainer: {
		flex: 5,
	},
	detailSpacing: {
		flex: 0.1,
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
		paddingHorizontal: 40,
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
	rowItemFlexOne: {
		flex: 1,
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
	editForm: {},
});

export default DetailFull;
