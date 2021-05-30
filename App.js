import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={{
      //   headerStyle: { backgroundColor: '#42f44b' },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: { fontWeight: 'bold' },
      // }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      // screenOptions={{
      //   headerStyle: { backgroundColor: '#42f44b' },
      //   headerTintColor: '#fff',
      //   headerTitleStyle: { fontWeight: 'bold' },
      // }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        // tabBarOptions={{
        //   activeTintColor: '#42f44b',
        // }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="settings-helper"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
