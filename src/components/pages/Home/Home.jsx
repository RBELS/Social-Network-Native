import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavBar from '../../NavBar/NavBar';
import UsersScreen from '../../screens/UsersScreen/UsersScreen';
import FriendsScreen from '../../screens/FriendsScreen/FriendsScreen';
import ChatScreen from '../../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const Home = props => {
    return (
        <Tab.Navigator tabBar={NavBar} initialRouteName="Profile">
            <Tab.Screen name="Users" component={UsersScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default Home;