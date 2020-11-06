import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

import CreateShift from './src/screens/createShift';
import ViewCalendar from './src/screens/viewCalendar';
import ViewMetrics from './src/screens/viewMetrics';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name='Shift' component={CreateShift} />
				<Tab.Screen name='Calendar' component={ViewCalendar} />
				<Tab.Screen name='Metrics' component={ViewMetrics} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
