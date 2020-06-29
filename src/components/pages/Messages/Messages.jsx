import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Message from './Message/Message';
import { connect } from 'react-redux';
import { setMessagesTC, appendMessagesTC, pingMessagesTC, sendMessageTC, getDialogsTC } from '../../../redux/reducers/dialogs-page-reducer'
import { useEffect } from 'react';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

const Messages = ({navigation, route, setMessages, messages, totalPages, appendMessages, lastPK, pingMessages, sendMessage, getDialogs, ...props}) => {
    let username = route.params.username;

    const num = 20;

    const [page, setPage] = useState(1);

    const [input, setInput] = useState("");

    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            //console.log(username);
            pingMessages(username);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        setMessages(page,num,username);
    }, [username])

    useEffect(() => {
        if(page != 1) {
            console.log("Effect triggered")
            appendMessages(page,num,username,lastPK);
        }
    }, [page])

    const onSendPress = () => {
        sendMessage(username,input);
        setInput("");
        getDialogs();
    }

    return (
        <View style={styles.screen}>
            <InvertibleScrollView inverted style={styles.messages}>
                { messages.map(({msgText, pk, sender}) => <Message key={pk} text={msgText} align={ sender == username ? "flex-start" : "flex-end" }  />) }
                { totalPages > page && <Button onPress={() => { setPage(page+1) }} title="Show More" /> }
            </InvertibleScrollView>

            <View style={styles.form}>
                <View style={styles.input}>
                    <TextInput onChange={(e) => { setInput(e.nativeEvent.text) }} value={input} placeholder="your message" multiline={true} style={styles.textInput} />
                </View>

                <TouchableOpacity onPress={onSendPress} style={styles.send}>
                    <Icon name="send" color={"#000"} type="material" size={32}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        width: "100%"
    },
    messages: {
        width: "100%",
        height: "100%",
    },
    form: {
        height: "10%",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#FFF",
        paddingBottom: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
        elevation: 20,
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
        paddingHorizontal: 2,
    },
    send: {
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 10
    }
});

const mapStateToProps = state => ({
    messages: state.dialogsPage.right.messages,
    totalPages: state.dialogsPage.right.totalPages,
    lastPK: state.dialogsPage.right.lastPK
})

export default connect(mapStateToProps, { setMessages: setMessagesTC,
    appendMessages: appendMessagesTC,
    pingMessages: pingMessagesTC,
    sendMessage: sendMessageTC,
    getDialogs: getDialogsTC })(Messages);