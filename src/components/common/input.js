import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function Input({ customInputStyle, label, placeholder, value, onChangeText, returnKeyType, keyboardType, secureTextEntry }) {
    return (
        <View style={styles.container}> 
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                style={[styles.input, customInputStyle]} 
                placeholder={placeholder} 
                onChangeText={onChangeText} 
                value={value} 
                returnKeyType={returnKeyType} 
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: `100%`,
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        paddingTop: 5,
		paddingBottom: 5,
		borderBottomWidth: 0.5,
		borderBottomColor: 'lightgrey',
    },
    input: {
        borderWidth: 0.5,
		borderColor: `#B3BAC9`,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 8,
    },
});