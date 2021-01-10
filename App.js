import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { Ionicons } from '@expo/vector-icons';

// not using Analytics but prior to disabling it was causing a warning
Amplify.configure({
	...config,
	Analytics: {
		disabled: true,
	},
});

import CreateShift from './src/screens/createShift';
import ViewCalendar from './src/screens/viewCalendar';
import ViewMetrics from './src/screens/viewMetrics';
import ViewSettings from './src/screens/viewSettings';
import Profile from './src/components/settingsProfile';
import Jobs from './src/components/settingsJobs';
import CreateJob from './src/components/createJob';
import EditJob from './src/components/editJob';

const RootStack = createStackNavigator();

const RootJobsScreen = ({ navigation }) => {
	return (
		<RootStack.Navigator mode='modal'>
			<RootStack.Screen
				name='CurrentJobs'
				component={Jobs}
				options={{ headerShown: false }}
			/>
			<RootStack.Screen
				name='CreateJobModal'
				component={CreateJob}
				options={{ headerShown: false }}
			/>
			<RootStack.Screen
				name='EditJob'
				component={EditJob}
				options={{ headerShown: false }}
			/>
		</RootStack.Navigator>
	);
};

const SettingsStack = createStackNavigator();

const SettingsStackScreen = ({ navigation }) => {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen name='Settings' component={ViewSettings} />
			<SettingsStack.Screen name='Profile' component={Profile} />
			<SettingsStack.Screen name='Jobs' component={RootJobsScreen} />
		</SettingsStack.Navigator>
	);
};

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => {
						let iconName;

						if (route.name === 'Shift') {
							iconName = `md-add`;
						} else if (route.name === 'Calendar') {
							iconName = `md-calendar`;
						} else if (route.name === 'Metrics') {
							iconName = `md-stats`;
						} else if (route.name === 'Settings') {
							iconName = `md-settings`;
						}

						return <Ionicons name={iconName} size={25} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: '#06D6A0',
					inactiveTintColor: 'gray',
					showLabel: false,
					showIcon: true,
				}}
			>
				<Tab.Screen name='Shift' component={CreateShift} />
				<Tab.Screen name='Calendar' component={ViewCalendar} />
				<Tab.Screen name='Metrics' component={ViewMetrics} />
				<Tab.Screen name='Settings' component={SettingsStackScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default withAuthenticator(App, { includeGreetings: true });
