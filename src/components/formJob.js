import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const FormJob = ({ labels, initFormValue, onSubmit, onDelete, isEdit }) => {
    const { city, address_line1, address_line2, address_state, address_zip } = initFormValue.storeAddress;

    const [title, setTitle] = useState(initFormValue.jobTitle);
	const [wage, setWage] = useState(initFormValue.jobWage);
	const [store, setStore] = useState(initFormValue.storeName);
	const [address, setAddress] = useState({
		city,
		country: 'USA',
		address_line1,
		address_line2,
		address_state,
		address_zip,
	});
    const [formError, setFormError] = useState('');

    const onAddressChange = (event, name) => {
		setAddress({ ...address, [name]: event.nativeEvent.text });
	};

    // perform error checking prior to submit
    const checkFormValues = () => {
        const { city, address_line1, address_state, address_zip } = address;

		// job title and wage are both required
		if (title === '') {
			return setFormError('Fill in job title');
		}
		if (wage === '') {
			return setFormError('Fill in hourly wage');
		} else if (parseInt(wage) > 30) {
			return setFormError('Wage is too high');
		} else if (parseInt(wage) < 0) {
            return setFormError('Wage needs to be positive');
        }

		// if line one is provided, check all other fields
		if (address_line1 !== '') {
			if (address_line1 === '') {
				return setFormError('Fill in Address Line 1');
			}
			if (address_state === '') {
				return setFormError('Fill in State');
			}
			if (address_zip === '') {
				return setFormError('Fill in Zip Code');
			}
			if (city === '') {
				return setFormError('Fill in City');
			}
		}
        onSubmit(title, wage, store, address);
    };
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.body}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{labels.title}</Text>
                        {isEdit === true && 
                            <TouchableOpacity 
                                style={styles.deleteBtn}
                                onPress={() => onDelete()} 
                            >
                                <Ionicons name="md-trash" size={24} color="#EF476F" />
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.subtitle}>Job Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    {console.log(typeof wage)}
                    <View style={styles.row}>
                        <Text style={styles.subtitle}>Wage</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='decimal-pad'
                            returnKeyType='done'
                            value={wage}
                            onChangeText={(text) => setWage(text)}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subtitle}>Store Name</Text>
                        <TextInput
                            style={styles.input}
                            value={store}
                            onChangeText={(text) => setStore(text)}
                        />
                    </View>
                    <View style={styles.rowLarge}>
                        <Text style={styles.subtitle}>Store Address</Text>
                        <Text>Street 1</Text>
                        <TextInput
                            style={styles.input}
                            value={address.address_line1}
                            onChange={(event) => onAddressChange(event, 'address_line1')}
                        />
                        <Text>Street 2</Text>
                        <TextInput
                            style={styles.input}
                            value={address.address_line2}
                            onChange={(event) => onAddressChange(event, 'address_line2')}
                        />
                        <Text>City</Text>
                        <TextInput
                            style={styles.input}
                            value={address.city}
                            onChange={(event) => onAddressChange(event, 'city')}
                        />
                        <Text>Zip</Text>
                        <TextInput
                            style={styles.input}
                            value={address.address_zip}
                            keyboardType='decimal-pad'
                            returnKeyType='done'
                            onChange={(event) => onAddressChange(event, 'address_zip')}
                        />
                        <Text>State</Text>
                        <TextInput
                            style={styles.input}
                            value={address.address_state}
                            onChange={(event) => onAddressChange(event, 'address_state')}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => checkFormValues()} style={styles.btn}>
                            <Text style={styles.btnText}>{labels.button}</Text>
                        </TouchableOpacity>
                    </View>
                    {formError !== '' && (
                        <Text style={{ color: `red` }}>{formError}</Text>
                    )}
                    <View style={styles.hardFiller} />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

FormJob.defaultProps = {
    initFormValue: {
        title: '',
        wage: '',
        store: '',
        address: {
            address_line1: '',
            address_line2: '',
            city: '',
            state: '',
            zip: '',
        }
    }
}

const styles = StyleSheet.create({
	hardFiller: {
		height: Platform.OS === 'ios' ? 100 : 200,
	},
	container: {
		flex: 1,
		justifyContent: `flex-start`,
		padding: 12,
	},
	title: {
		fontSize: 36,
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
	},
	header: {
		flex: 0.1,
		width: `100%`,
		justifyContent: `center`,
		alignItems: `flex-start`,
	},
	body: {
		flex: 1,
	},
	input: {
		borderWidth: 1,
		borderColor: `#A2A7A5`,
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	row: {
		flex: 1,
	},
	titleRow: {
		flex: 1,
		flexDirection: `row`,
		justifyContent: `space-between`
	},
	rowLarge: {
		flex: 4,
	},
	btnContainer: {
		marginTop: 12,
		flex: 1,
	},
	btnText: {
		color: `white`,
	},
	btn: {
		padding: 10,
		backgroundColor: `#39A0ED`,
		alignItems: `center`,
		borderRadius: 2.5,
	},
	deleteBtn: {
		flexDirection: `row`,
		justifyContent: `flex-end`,
		alignItems: `center`
	},
	deleteText: {
		color: `#EF476F`,
		fontSize: 18,
		marginLeft: 8
	}
});

export default FormJob;