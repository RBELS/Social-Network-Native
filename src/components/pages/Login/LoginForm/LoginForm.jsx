import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { Field, reduxForm } from 'redux-form';
import { Input } from '../CustomInputs/Input';
import { InputPassword } from '../CustomInputs/InputPassword';
import { StyleSheet } from 'react-native';

const LoginForm = ({handleSubmit, error, ...props}) => {
    return (
        <>
            <View style={styles.form}>
                <Field name="username" placeholder="username" component={Input} />
                <Field name="password" placeholder="password" component={InputPassword} />

                <TouchableOpacity onPress={handleSubmit} style={styles.loginBt}>
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.errorView}>
                <Text style={styles.error}>{error}</Text>
            </View>
        </>
    )
}

export default reduxForm({ form: "Login" })(LoginForm)

const styles = StyleSheet.create({
    form: {
        width: "90%",
        height: 220,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    loginBt: {
        borderRadius: 10,
        backgroundColor: "#29d629",
        height: 50,
        width: "90%",
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        fontSize: 24,
        color: "#FFF",
    },
    errorView: {
        height:20,
        marginRight: "10%",
        alignSelf: "flex-end"
    },
    error: {
        color: "red"
    }
});