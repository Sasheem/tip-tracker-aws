import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 *
 * @param {text from parent newShiftForm} param0
 */

const ShiftTag = ({ text }) => {
	return (
		<View
			style={{
				flexDirection: `row`,
				justifyContent: `center`,
				alignItems: `center`,
				backgroundColor: `rgba(139, 123, 119, 0.4)`,
				paddingTop: 1,
				paddingBottom: 1,
				paddingLeft: 5,
				paddingRight: 5,
				borderRadius: 5,
				height: 30,
			}}
		>
			<Text style={{ color: `rgba(139, 123, 119, 1)`, margin: 0, padding: 0 }}>
				{text}
			</Text>
			<AntDesign
				name='close'
				size={16}
				color='rgba(139, 123, 119, 1)'
				style={{ marginTop: 2 }}
			/>
		</View>
	);
};

export default ShiftTag;
