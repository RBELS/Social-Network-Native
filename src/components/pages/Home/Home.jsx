import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavBar from '../../NavBar/NavBar';
import UsersScreen from '../../screens/UsersScreen/UsersScreen';
import FriendsScreen from '../../screens/FriendsScreen/FriendsScreen';
import ChatScreen from '../../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Login from '../Login/Login';

const Tab = createBottomTabNavigator();

const Home = ({logged, navigation, ...props}) => {
    if(logged) {
        return (
            <Tab.Navigator tabBar={NavBar} initialRouteName="Friends">
                <Tab.Screen name="Users" component={UsersScreen} />
                <Tab.Screen name="Friends" component={FriendsScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        );
    } else {
        // navigation.navigate("Login");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login", component: Login }]
        });
        return (
            <View>
                <Text>Fetching...</Text>
            </View>
        )
    }
}

export default connect(state => ({
    logged: state.auth.logged
}))(Home);