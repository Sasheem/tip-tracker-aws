import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

// local components
import CustomInput from './common/customInput';
import Button from './common/customButton';

const SettingsStorage = () => {
    const [exportEmail, setExportEmail] = useState('');
    const [exportError, setExportError] = useState('');
    const [importError, setImportError] = useState('');

    // controlled form functions
    const onExportChange = text => {
        setExportEmail(text);
        setExportError('');
    }
    const sendExport = () => {
        console.log(`attempting to email export data`);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Storage Options</Text>
            <CustomInput 
                label='Export data'
                desc='Enter email to send your shift data to.'
                placeholder='Email address'
                onChangeText={(text) => onExportChange(text)}
                value={exportEmail}
                keyboardType='default'
            />
            <View style={styles.buttonContainer}>
                <Button label='Send' onPress={sendExport} customStyle={{ alignSelf: `flex-end` }} />
            </View>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Local data</Text>
                <Text style={styles.desc}>Sync up your local data with cloud data to keep your shifts up to date in your calendar.</Text>
                <Button label='Sync' onPress={onSyncPress} customStyle={{ alignSelf: `flex-end` }} />
            </View>
            
            <View style={styles.fillerLg} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
		paddingTop: 48,
		paddingLeft: 24,
		paddingRight: 24,
		flex: 1,
		alignItems: `flex-start`,
        justifyContent: `flex-start`
	},
    title: {
        fontSize: 24,
    },
    subtitle: {
        fontSize: 16,
    },
    desc: {
        fontSize: 14,
    },
    buttonContainer: {
        width: `100%`,
        flex: 1,
    },
    row: {
        flex: 1,
        width: `100%`,
    },
    fillerLg: {
        flex: 4,
    },
    importContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    import: {},
    importButton: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    }
});

export default SettingsStorage;