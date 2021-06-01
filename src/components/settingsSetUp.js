import React, { useState }  from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

// local components
import Input from './common/input';
import Button from './common/button';

const SettingsSetUp = () => {
    const [remindersEnabled, setRemindersEnabled] = useState(false);
	const [dailyGoal, setDailyGoal] = useState('');
	const [weeklyGoal, setWeeklyGoal] = useState('');
	const [monthlyGoal, setMonthlyGoal] = useState('');
	const [goalsError, setGoalsError] = useState('');

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
	const toggleSwitch = () => setRemindersEnabled(remindersEnabled => !remindersEnabled);
    const onSave = () => {
        if (dailyGoal.length !== 0) {
            console.log(`Daily goal set: ${dailyGoal}`)
        }

        if (weeklyGoal.length !== 0) {
            console.log(`Weekly goal set: ${weeklyGoal}`);
        }

        if (monthlyGoal.length !== 0) {
            console.log(`Monthly goal set: ${monthlyGoal}`)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Tip Goals</Text>
            <Input
                label='Daily' 
                placeholder='$0.00'
                value={dailyGoal}
                onChangeText={(text) => onDailyChange(text)}
                returnKeyType='done'
                keyboardType='decimal-pad'
            /> 
            <Input
                label='Weekly' 
                placeholder='$0.00'
                value={weeklyGoal}
                onChangeText={(text) => onWeeklyChange(text)}
                returnKeyType='done'
                keyboardType='decimal-pad'
            />
            <Input
                label='Monthly' 
                placeholder='$0.00'
                value={monthlyGoal}
                onChangeText={(text) => onMonthlyChange(text)}
                returnKeyType='done'
                keyboardType='decimal-pad'
            />
            <Button
                onPress={onSave} 
                label="Save"
                customStyle={{ alignSelf: `flex-end` }}
            />
            <View style={styles.row}>
                <Text style={styles.label}>Notification reminder</Text>
                <Text style={styles.desc}>Set up notification reminders to add your shifts</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#06D6A0' }}
                    thumbColor='#f4f3f4'
                    ios_backgroundColor='#3e3e3e'
                    onValueChange={toggleSwitch}
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
    }
});

export default SettingsSetUp;