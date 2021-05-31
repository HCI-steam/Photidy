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
  PhotoViewScreen,
  AlbumsScreen,
  AlbumScreen,
  SettingsScreen,
  ProfileScreen,
} from './src/screens';

import { MainTopLeftMenu, MainTopRightMenu } from './src/components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '보관함',
          headerLeft: props => <MainTopLeftMenu {...props} />,
          headerRight: props => <MainTopRightMenu {...props} />,
        }}
      />
      <Stack.Screen
        name="PhotoView"
        component={PhotoViewScreen}
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
        options={{ title: '설정' }}
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
    <Stack.Navigator initialRouteName="Albums">
      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
        options={{ title: '앨범' }}
      />
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
        initialRouteName="BottomTab"
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
            tabBarLabel: '설정',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
