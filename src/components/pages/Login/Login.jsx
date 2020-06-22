import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux';
import { loginTC, logoutTC } from '../../../redux/reducers/auth-reducer';
import Home from '../Home/Home';
import { compose } from 'redux';
import LoginForm from './LoginForm/LoginForm';

const Login = ({logged, login, navigation, ...props}) => {
    const onBtClick = ({ username, password }) => {
        login(username,password);
    }


    if(logged) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home", component: Home }]
        });
        return (
            <View style={styles.redirectPage}>
                <Text>Logging in...</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.page}>
                <View style={styles.content}>
                    <LoginForm onSubmit={onBtClick} />
                </View>

                <View style={styles.bottom}>
                    <Text>У вас еще нет аккаунта?</Text>
                    <Text style={styles.bold}>Зарегистрируйтесь.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    redirectPage: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    page: {
        height: "100%",
    },
    content: {
        height: "94%",
        alignItems: "center",
        justifyContent: "center"
    },
    bottom: {
        height: "6%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
        elevation: 20,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    bold: {
        fontWeight:"bold"
    }
});

const mapStateToProps = state => {
    return {
        logged: state.auth.logged
    }
}

export default compose(
    connect(mapStateToProps, { login: loginTC, logout: logoutTC })
)(Login)