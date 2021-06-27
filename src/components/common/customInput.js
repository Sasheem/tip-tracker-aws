import React from 'react';
import { StyleSheet, View, Text, TextInput, useColorScheme } from 'react-native';

export default function CustomInput({ customInputStyle, label, desc, placeholder, value, onChangeText, returnKeyType, keyboardType, secureTextEntry }) {
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
	const themeBorderStyle = colorScheme === 'light' ? styles.lightThemeBorder : styles.darkThemeBorder;

    return (
        <View style={styles.container}> 
            <Text style={[styles.label, themeTextStyle]}>{label}</Text>
            {desc && <Text style={[styles.desc, themeTextStyle]}>{desc}</Text>}
            <TextInput 
                style={[styles.input, customInputStyle, themeBorderStyle, themeTextStyle]} 
                placeholder={placeholder} 
                onChangeText={onChangeText} 
                value={value} 
                returnKeyType={returnKeyType} 
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={colorScheme === 'light' ? `#242c40` : `#BABAB4`} 
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
        fontWeight: `500`,
        paddingTop: 5,
		paddingBottom: 5,
		borderBottomWidth: 0.5,
		borderBottomColor: 'lightgrey',
    },
    input: {
        borderWidth: 0.5,
		// borderColor: `#B3BAC9`,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 8,
    },
    desc: {
        fontSize: 14,
        width: `100%`,
        paddingBottom: 5,
    },
    lightThemeBorder: {
		borderColor: `#242c40`,
	},
	darkThemeBorder: {
		borderColor: `#d0d0c0`,
	},
	lightThemeText: {
		color: `#242c40`,
	},
	darkThemeText: {
		color: '#d0d0c0',
	},
});