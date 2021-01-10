import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import DetailFull from './detailFull';
import DetailEmpty from './detailEmpty';

const CalendarDetail = ({ currentDetail, jobs, currentDate, navigation }) => {
	return (
		<View style={{ flex: 1 }}>
			{_.isEmpty(currentDetail) ? (
				<DetailEmpty date={currentDate} navigation={navigation} />
			) : (
				<DetailFull
					currentDetail={currentDetail}
					jobs={jobs}
					currentDate={currentDate}
				/>
			)}
		</View>
	);
};

export default CalendarDetail;
