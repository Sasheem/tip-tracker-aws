import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// local components
import Input from '../components/common/input';
import Button from '../components/common/button';

const SettingsStorage = () => {
    const [exportEmail, setExportEmail] = useState('');
    const [exportError, setExportError] = useState('');
    // const [importFile, setImportFile] = useState('');
    // const [importError, setImportError] = useState('');


    // controlled form functions
    const onExportChange = text => {
        setExportEmail(text);
        setExportError('');
    }
    const sendExport = () => {
        console.log(`attempting to email export data`);
    }
    const onSyncPress = () => {
        console.log(`sync cloud data with local DataStore`);
    }

    // const onImportPress = async () => {
    //     // Pick a single file
    //     try {
    //         const res = await DocumentPicker.pick({
    //         type: [DocumentPicker.types.images],
    //         });
    //         console.log(
    //         res.uri,
    //         res.type, // mime type
    //         res.name,
    //         res.size
    //         );
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //         // User cancelled the picker, exit any dialogs or menus and move on
    //         } else {
    //         throw err;
    //         }
    //     }
    // }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Storage Options</Text>
            <Input 
                label='Export data'
                desc='Enter email to send your shift data to.'
                placeholder='Email address'
                onChangeText={(text) => onExportChange(text)}
                value={exportEmail}
                keyboardType='default'
            />
            <View style={styles.buttonContainer}>
                <Button label='Send' onPress={sendExport} />
            </View>
            <View style={styles.row}>
                <Text style={styles.subtitle}>Local data</Text>
                <Text style={styles.desc}>Sync up your local data with cloud data.</Text>
                <Button label='Sync' onPress={onSyncPress} />
            </View>
            
            {/* <View style={styles.row}>
                <SafeAreaView style={styles.importContainer}>
                    <Text>Import data</Text>
                    <View style={styles.import}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.importButton}
                            onPress={onImportPress}
                        >
                            <Text>Click here to upload a file</Text>
                            <MaterialCommunityIcons name="import" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {importFile !== '' && <View style={styles.import}>
                        <Text style={styles.textStyle}>
                            File Name: {importFile.name ? importFile.name : ''}
                            {'\n'}
                            Type: {importFile.type ? importFile.type : ''}
                            {'\n'}
                            File Size: {importFile.size ? importFile.size : ''}
                            {'\n'}
                            URI: {importFile.uri ? singleFile.uri : ''}
                            {'\n'}
                            </Text>
                    </View>}
                </SafeAreaView>
            </View> */}
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
        flex: 1,
    },
    row: {
        flex: 1,
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