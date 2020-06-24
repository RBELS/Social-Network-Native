import React, { useEffect } from 'react'
import Home from '../pages/Home/Home'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { initAppTC } from '../../redux/reducers/app-reducer';
import Login from '../pages/Login/Login';
import { loginTC } from '../../redux/reducers/auth-reducer';
import UserPage from '../pages/UserPage/UserPage';

const Stack = createStackNavigator();

const NavigatorContainer = ({init, initialized, logged, login, ...props }) => {

    useEffect(() => {
        init(logged);
    }, []);

    if(initialized) {
        return (
            <Stack.Navigator initialRouteName={logged ? "Home" : "Login"}>
                <Stack.Screen options={{ headerLeft: null, headerShown: false }} name="Home" component={Home}/>
                <Stack.Screen options={{ headerLeft: null }} name="Login" component={Login} />
                <Stack.Screen options={{ headerShown: false }} name="UserPage" component={UserPage} />
            </Stack.Navigator>
        )
    } else {
        return (
            <View style={styles.ft}>
                <Text>Fetching...</Text>
            </View>
        )
    }

    
}

const styles = StyleSheet.create({
    ft: {
        alignItems:"center",
        justifyContent:"center",
        height: "100%"
    }
});

const mapStateToProps = state => {
    return {
        initialized: state.app.init,
        logged: state.auth.logged
    }
}

export default connect(mapStateToProps, {
    init: initAppTC,
    login: loginTC
})(NavigatorContainer)