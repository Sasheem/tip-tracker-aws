import React from 'react';
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

import { Provider as ShiftsProvider } from './src/context/ShiftsContext';
import { Provider as JobsProvider } from './src/context/JobsContext';
import CreateShift from './src/screens/createShift';
import ViewCalendar from './src/screens/viewCalendar';
import ViewMetrics from './src/screens/viewMetrics';
import ViewSettings from './src/screens/viewSettings';
import SettingsAccount from './src/components/settingsAccount';
import SettingsGoals from './src/components/settingsGoals';
import SettingsNotifications from './src/components/settingsNotifications';
import SettingsJobs from './src/components/settingsJobs';
import SettingsStorage from './src/components/settingsStorage';
import CreateJob from './src/components/createJob';
import EditJob from './src/components/editJob';

const RootStack = createStackNavigator();

const RootJobsScreen = ({ navigation }) => {
	return (
		<RootStack.Navigator mode='modal'>
			<RootStack.Screen
				name='CurrentJobs'
				component={SettingsJobs}
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
			<SettingsStack.Screen name='Account' component={SettingsAccount} />
			<SettingsStack.Screen name='Jobs' component={RootJobsScreen} />
			<SettingsStack.Screen name='Goals' component={SettingsGoals} />
			<SettingsStack.Screen name='Notifications' component={SettingsNotifications} />
			<SettingsStack.Screen name='Storage' component={SettingsStorage} />
		</SettingsStack.Navigator>
	);
};

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<ShiftsProvider>
			<JobsProvider>
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ color }) => {
								let iconName;

								if (route.name === 'Shift') {
									iconName = `add-circle`;
								} else if (route.name === 'Calendar') {
									iconName = `md-calendar`;
								} else if (route.name === 'Metrics') {
									iconName = `stats-chart`;
								} else if (route.name === 'Settings') {
									iconName = `settings`;
								}

								return <Ionicons name={iconName} size={25} color={color} />;
							},
						})}
						tabBarOptions={{
							activeTintColor: '#39A0ED',
							inactiveTintColor: 'gray',
							showLabel: false,
							showIcon: true,
						}}
					>
						<Tab.Screen name='Shift' component={CreateShift} options={{ tabBarLabel: 'Add' }} />
						<Tab.Screen name='Calendar' component={ViewCalendar} options={{ title: 'Calendar' }} />
						<Tab.Screen name='Metrics' component={ViewMetrics} options={{ title: 'Metrics' }} />
						<Tab.Screen name='Settings' component={SettingsStackScreen} />
					</Tab.Navigator>
				</NavigationContainer>
			</JobsProvider>
		</ShiftsProvider>
	);
};

export default withAuthenticator(App, { includeGreetings: true });
