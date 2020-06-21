import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/redux-store'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from './src/components/screens/ProfileScreen/ProfileScreen';
import UsersScreen from './src/components/screens/UsersScreen/UsersScreen';
import FriendsScreen from './src/components/screens/FriendsScreen/FriendsScreen'
import ChatScreen from './src/components/screens/ChatScreen/ChatScreen'
import NavBar from './src/components/NavBar/NavBar';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Tab.Navigator tabBar={NavBar} initialRouteName="Profile">
          <Tab.Screen name="Users" component={UsersScreen} />
          <Tab.Screen name="Friends" component={FriendsScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
