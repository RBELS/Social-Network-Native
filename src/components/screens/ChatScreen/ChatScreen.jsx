import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from "react-native-elements";
import NavBar from '../../NavBar/NavBar';

const ChatScreen = ({navigation, route}) => {

    return (
        <View style={styles.screen}>
            <Text>ChatScreen</Text>
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

export default ChatScreen