import React, { useEffect, useRef, useCallback } from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppState, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  HomeScreen,
  PhotoViewScreen,
  AlbumsScreen,
  AlbumScreen,
  SettingsScreen,
  ProfileScreen,
} from './src/screens';
import { MainTopLeftMenu, MainTopRightMenu } from './src/components';
import store from './src/redux';
import { actions as permissionActions } from './src/redux/states/permissionsState';
import { actions as appActions } from './src/redux/states/appState';
import { actions as assetsActions } from './src/redux/states/assetsState';
import { actions as albumsActions } from './src/redux/states/albumsState';
import { getAppIsLoaded, getSFModalVisible } from './src/redux/selectors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const modalVisible = useSelector(state => getSFModalVisible(state));

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="float">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: !modalVisible,
          headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          title: '보관함',
          headerTitleAlign: 'center',
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

function AppWrapper() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch();
  const appIsLoaded = useSelector(state => getAppIsLoaded(state));
  console.log(appIsLoaded);

  useEffect(() => {
    if (!appIsLoaded) {
      dispatch(permissionActions.requestMediaLibraryPermission());
      dispatch(assetsActions.requestAllAssets());
      dispatch(albumsActions.requestAllAlbums());
    }
    dispatch(appActions.setAppIsLoaded(true));
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="BottomTab"
        // tabBarOptions={{
        //   activeTintColor: '#42f44b',
        //   style: {
        //     backgroundColor: 'rgba(255,255,255, 0.85)',
        //     position: 'absolute',
        //   },
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

export default AppWrapper;
