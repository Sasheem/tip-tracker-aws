import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// local components
import CustomInput from './common/customInput';
import CustomButton from './common/customButton';

const SettingsSetUp = () => {
	const [dailyGoal, setDailyGoal] = useState('');
	const [weeklyGoal, setWeeklyGoal] = useState('');
	const [monthlyGoal, setMonthlyGoal] = useState('');
	const [goalsError, setGoalsError] = useState('');
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    // component did mount
    useEffect(() => {
        fetchSettings();
        return () => {};
    }, []);

    // fetch local storage settings
    const fetchSettings = async () => {
        // fetch settings
        let daily = await AsyncStorage.getItem('@Settings_dailyGoal');
        let weekly = await AsyncStorage.getItem('@Settings_weeklyGoal');
        let monthly = await AsyncStorage.getItem('@Settings_monthlyGoal');
        let enabled = await AsyncStorage.getItem('@Settings_remindersEnabled');
        
        daily !== undefined ? setDailyGoal(daily) : console.log('No saved daily to load');
        weekly !== undefined ? setWeeklyGoal(weekly) : console.log('No saved weekly to load');
        monthly !== undefined ? setMonthlyGoal(monthly) : console.log('No saved monthly to load');
        enabled !== undefined ? setRemindersEnabled(Boolean(parseInt(enabled))) : console.log('No saved remindersEnabled to load');
    }

	// form controlled functions
	const onDailyChange = text => {
		setDailyGoal(text);
		setGoalsError('');
	}
	const onWeeklyChange = text => {
		setWeeklyGoal(text); 
		setGoalsError('');
	}
	const onMonthlyChange = text => {
		setMonthlyGoal(text);
		setGoalsError('');
	}

    const toggleRemindersAsyncStorage = async () => {
        setRemindersEnabled(remindersEnabled => !remindersEnabled);
        let remindersAsString = !remindersEnabled === false ? '0' : '1';
        await AsyncStorage.setItem('@Settings_remindersEnabled', remindersAsString);
    }

    // save goal settings
    const onSave = async () => {
        if (dailyGoal.length !== 0) {
            if (testIfPositive(dailyGoal) === false) return setGoalsError('Daily goal must be positive');
            await AsyncStorage.setItem('@Settings_dailyGoal', dailyGoal);
            console.log(`Daily goal set: ${dailyGoal}`);
        } 

        if (weeklyGoal.length !== 0) {
            if (testIfPositive(weeklyGoal) === false) return setGoalsError('Weekly goal must be positive');
            await AsyncStorage.setItem('@Settings_weeklyGoal', weeklyGoal);
            console.log(`Weekly goal set: ${weeklyGoal}`);
        }

        if (monthlyGoal.length !== 0) {
            if (testIfPositive(monthlyGoal) === false) return setGoalsError('Monthly goal must be positive');
            await AsyncStorage.setItem('@Settings_monthlyGoal', monthlyGoal);
            console.log(`Monthly goal set: ${monthlyGoal}`);
        }

        if (weeklyLessThanMonthly(weeklyGoal, monthlyGoal) === false) return setGoalsError('Weekly goal must be less than monthly goal');
    }

    // helper function - test
    const weeklyLessThanMonthly = (w, m) => parseInt(w) < parseInt(m) ? true : false;
    
    const testIfPositive = (text) => {
        let number = parseInt(text);
        return number < 0 ? false : true;
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Tip Goals</Text>
            <CustomInput
                label='Daily' 
                placeholder='$0.00'
                value={dailyGoal}
                onChangeText={(text) => onDailyChange(text)}
                returnKeyType='done'
                keyboardType='decimal-pad'
            /> 
            <CustomInput
                label='Weekly' 
                placeholder='$0.00'
                value={weeklyGoal}
                onChangeText={(text) => onWeeklyChange(text)}
                returnKeyType='done'
                keyboardType='decimal-pad'
            />
            <CustomInput
                label='Monthly' 
                placeholder='$0.00'
                value={monthlyGoal}
                onChangeText={(text) => onMonthlyChange(text)}
                returnKeyType='done'
                keyboardType='decimal-pad'
            />
            <CustomButton
                onPress={onSave} 
                label="Save"
                customStyle={{ alignSelf: `flex-end` }}
            />
            {goalsError !== '' &&
                <View style={styles.row}>
                    <Text style={styles.error}>{goalsError}</Text>
                </View>
            }
            <View style={styles.row}>
                <Text style={styles.label}>Notification reminder</Text>
                <Text style={styles.desc}>Set up notification reminders to add your shifts</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#06D6A0' }}
                    thumbColor='#f4f3f4'
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleRemindersAsyncStorage}
                    value={remindersEnabled}
                    style={{ alignSelf: `flex-end` }}
                />
            </View>
            <View style={styles.fillerLarge} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
		paddingTop: 24,
		paddingLeft: 24,
		paddingRight: 24,
		alignItems: `flex-start`,
        flex: 2,
        
	},
    column: {
        flex: 1,
        justifyContent: `flex-start`,
    },
    row: {
        width: `100%`,
        flex: 1,
        marginTop: 20,
    },
    fillerLarge: {
        flex: 4,
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
    error: {
        color: `red`,
        fontWeight: `500`,
        textAlign: `center`,
    },
});

export default SettingsSetUp;