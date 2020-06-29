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
import { useEffect } from 'react';
import { checkIfHaveUnreadsTC } from '../../../redux/reducers/nav-bar-reducer';
import { getNameTC } from '../../../redux/reducers/auth-reducer';

const Tab = createBottomTabNavigator();

const Home = ({logged, navigation, haveUnreads,checkIfHaveUnreads, getName, ...props}) => {

    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            checkIfHaveUnreads(haveUnreads);
        }, 1000);
        getName();

        return () => {
            clearInterval(interval);
        }
    }, []);

    if(logged) {
        return (
            <Tab.Navigator tabBarOptions={{ haveUnreads }} tabBar={NavBar} initialRouteName="Profile">
                <Tab.Screen name="Users" component={UsersScreen} />
                <Tab.Screen name="Friends" component={FriendsScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        );
    } else {
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
    logged: state.auth.logged,
    haveUnreads: state.navBar.haveUnreads
}), {
    checkIfHaveUnreads: checkIfHaveUnreadsTC,
    getName: getNameTC
})(Home);