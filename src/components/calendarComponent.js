import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
	return (
		<View style={{ backgroundColor: `pink`, marginTop: 100 }}>
			<Calendar
				showWeekNumbers
				hideExtraDays
				firstDay={1}
				style={{}}
				dayComponent={({ date, state }) => {
					return (
						<View>
							<Text
								style={{
									textAlign: 'center',
									color: state === 'disabled' ? 'gray' : 'black',
								}}
							>
								{date.day}
							</Text>
						</View>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	calendar: {
		borderTopWidth: 1,
		paddingTop: 5,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	container: {
		flex: 1,
		backgroundColor: 'gray',
	},
	cellStyles: {
		fontSize: 8,
		textAlign: 'center',
	},
});

export default CalendarComponent;
