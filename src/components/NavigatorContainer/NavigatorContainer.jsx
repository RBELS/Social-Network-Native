import React, { useEffect } from 'react'
import Home from '../pages/Home/Home'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { initAppTC } from '../../redux/reducers/app-reducer';
import Login from '../pages/Login/Login';

const Stack = createStackNavigator();

const NavigatorContainer = ({ initialized, logged, init, ...props }) => {

    useEffect(() => {
        init(logged);
    }, []);

    if(initialized) {
        return (
            <Stack.Navigator initialRouteName={logged ? "Home" : "Login"}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Login" component={Login} />
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
    init: initAppTC
})(NavigatorContainer)