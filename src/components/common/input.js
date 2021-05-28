import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function Input({ customInputStyle, label, placeholder, value, onChangeText, returnKeyType, keyboardType }) {
    return (
        <View style={styles.container}> 
            <Text style={styles.text}>{label}</Text>
            <TextInput 
                style={[styles.input, customInputStyle]} 
                placeholder={placeholder} 
                onChangeText={onChangeText} 
                value={value} 
                returnKeyType={returnKeyType} 
                keyboardType={keyboardType} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 16,
		fontWeight: `bold`,
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