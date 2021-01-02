import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 *
 * @param {text from parent newShiftForm} param0
 */

const ShiftTag = ({ text, forDetail, setTagToDelete }) => {
	return (
		<View
			style={{
				flexDirection: `row`,
				justifyContent: `center`,
				alignItems: `center`,
				backgroundColor: `#22AED1`,
				paddingTop: 1,
				paddingBottom: 1,
				paddingLeft: 5,
				paddingRight: 5,
				borderRadius: 5,
				height: 30,
				marginRight: 10,
			}}
		>
			<Text style={{ color: `#F7F9F9`, margin: 0, padding: 0 }}>{text}</Text>
			{forDetail === false && (
				<TouchableOpacity onPress={() => setTagToDelete(text)}>
					<AntDesign
						name='close'
						size={16}
						color='#F7F9F9'
						style={{ marginTop: 2 }}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default ShiftTag;
