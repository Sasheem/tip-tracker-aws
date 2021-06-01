import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SettingsStorage = () => {
    return (
        <View style={styles.container}>
            <Text>Storage Options</Text>
            <Text>Import data</Text>
            <Text>Export data</Text>
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
	},
});

export default SettingsStorage;