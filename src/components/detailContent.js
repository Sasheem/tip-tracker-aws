import React, { useState, useContext, useEffect } from 'react';
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

import { Context as ShiftsContext } from '../context/ShiftsContext';
import { Context as JobsContext } from '../context/JobsContext';
import FormShift from './formShift';
import DeleteShift from './deleteShift';
import ShiftTag from './shiftTag';

const DetailContent = ({ shift, editModal, setEditModal, deleteModal, setDeleteModal, handleDeleteShift }) => {
    // context
    const { state: fetchedJobs, getJobs } = useContext(JobsContext);
	const { editShift } = useContext(ShiftsContext);

    // props
    const { id, amount, hours, job, tags } = shift;
    

    // state
    const [jobItem, setJobItem] = useState();
    const [hourly, setHourly] = useState(0.0);

    // fetch jobs
    useEffect(() => {
        getJobs();
    }, []);

    useEffect(() => {
        // calculate the hourly if it exists
        let hourlyCalculated =
        (amount !== null) & (hours !== null)
            ? parseFloat(amount) / parseFloat(hours)
            : 0.0;
        setHourly(hourlyCalculated);
        // match job id to get job data
        if (job !== undefined) {
            setJobItem(_.find(fetchedJobs, j => j.id === job))
        }
    }, [fetchedJobs]);


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
                        <FormShift 
                            labels={{
                                button: `Save`,
                            }}
                            initFormValue={shift ? { ...shift } : {}}
                            onSubmit={(dateShift, amountShift, hoursShift, inTimeShift, outTimeShift,  jobShift, tagsShift) => {
                                editShift(
                                    id, 
                                    dateShift, 
                                    amountShift, 
                                    hoursShift, 
                                    inTimeShift, 
                                    outTimeShift,  
                                    jobShift, 
                                    tagsShift, 
                                    () => setEditModal(false) 
                                )
                            }}
                            isEdit={true}
                            setEditModal={setEditModal}
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
                            handleDeleteShift={() => handleDeleteShift(id)}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.topRow}>
                <View style={styles.rowItemFlexOne}>
                    <Text>Amount</Text>
                    <Text>
                        $
                        {jobItem !== undefined && jobItem.jobWage > 5.54
                            ? jobItem.jobWage * parseFloat(hours)
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
                        {jobItem !== undefined && jobItem.jobWage > 5.54
                            ? jobItem.jobWage
                            : hourly.toFixed(2)}{' '}
                        /hr
                    </Text>
                </View>
            </View>
            <View style={styles.bottomRow}>
                <View style={{ flex: 1 }}>
                    <Text>Job</Text>
                    <Text>{jobItem !== undefined && jobItem.jobTitle}</Text>
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
}

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
		paddingTop: 35,
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

export default DetailContent;