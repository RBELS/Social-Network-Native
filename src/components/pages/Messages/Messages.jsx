import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

const Messages = ({navigation, route, ...props}) => {
    // let username = route.params.username;
    const username = "dty_123";

    return (
        <View style={styles.screen}>
            {/* <Text>Chatting with {username}</Text> */}
            <View style={styles.messages}>

            </View>

            <View style={styles.form}>
                <View style={styles.input}>
                    <TextInput placeholder="your message" multiline={true} style={styles.textInput} />
                </View>

                <View style={styles.send}>
                    <Icon name="send" color={"#000"} type="material" size={32}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    messages: {
        height: "90%",
        width: "100%",
    },
    form: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#FFF"
    },
    input: {
        width: "90%"
    },
    textInput: {
        height: "100%",
        marginRight: 10,
        marginLeft: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#bbb",
        borderStyle: "solid",
        borderRadius: 10,
        paddingHorizontal: 2
    },
    send: {
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10
    }
});

export default Messages;