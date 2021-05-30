import React from 'react';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  DetailsScreen,
  AlbumScreen,
  SettingsScreen,
  ProfileScreen,
} from './src/screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
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
    <Stack.Navigator initialRouteName="Settings">
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

function AlbumStack() {
  return (
    <Stack.Navigator initialRouteName="Album">
      <Stack.Screen
        name="Album"
        component={AlbumScreen}
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
            tabBarLabel: '보관함',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="photo-library" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AlbumStack"
          component={AlbumStack}
          options={{
            tabBarLabel: '앨범',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-albums" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: '더보기',
            tabBarIcon: ({ color, size }) => (
              <Feather name="more-horizontal" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
