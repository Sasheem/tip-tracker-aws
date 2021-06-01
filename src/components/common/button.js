import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, label, customStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, customStyle]}
        >
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
		backgroundColor: `#06D6A0`,
		alignItems: `center`,
		borderRadius: 2.5,
    },
    label: {
        color: `white`,
		fontSize: 16,
		fontWeight: `500`,
    }
})

export default Button;