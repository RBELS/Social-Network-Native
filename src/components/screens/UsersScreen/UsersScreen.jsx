import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import NavBar from '../../NavBar/NavBar';

const UsersScreen = ({navigation, route}) => {
    return (
        <View style={styles.screen}>
            <Text>UsersScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default UsersScreen