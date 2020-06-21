import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from "react-native-elements";
import NavBar from '../../NavBar/NavBar';

const FriendsScreen = ({navigation, route}) => {

    return (
        <View style={styles.screen}>
            <Text>FriendsScreen</Text>
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

export default FriendsScreen