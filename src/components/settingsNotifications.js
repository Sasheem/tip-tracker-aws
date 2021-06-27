import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// markup
const SettingsNotifications = () => {
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    // fetch settings when component loads
    useEffect(() => {
        fetchSettings();
        return () => {};
    }, [])

    // helper function
    const fetchSettings = async () => {
        let enabled = await AsyncStorage.getItem('@Settings_remindersEnabled');
        enabled !== undefined ? setRemindersEnabled(Boolean(parseInt(enabled))) : console.log('No saved remindersEnabled to load');
    }

    // change value based on switch input
    const toggleRemindersAsyncStorage = async () => {
        setRemindersEnabled(remindersEnabled => !remindersEnabled);
        let remindersAsString = !remindersEnabled === false ? '0' : '1';
        await AsyncStorage.setItem('@Settings_remindersEnabled', remindersAsString);
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Notification reminder</Text>
                <Text style={styles.desc}>Set up notification reminders to add your shifts</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#39A0ED' }}
                    thumbColor='#f4f3f4'
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleRemindersAsyncStorage}
                    value={remindersEnabled}
                    style={{ alignSelf: `flex-end` }}
                />
            </View>
            <View style={styles.fillerMd} />
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    container: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		alignItems: `flex-start`,
        flex: 1,
	},
    row: {
        width: `100%`,
        flex: 1,
        marginTop: 20,
    },
    fillerMd: {
        flex: 2,
    },
    subtitle: {
        fontSize: 20,
    },
    label: {
        fontSize: 18,
        paddingTop: 5,
		paddingBottom: 5,
		borderBottomWidth: 0.5,
		borderBottomColor: 'lightgrey',
    },
    desc: {
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
    },
});

export default SettingsNotifications;