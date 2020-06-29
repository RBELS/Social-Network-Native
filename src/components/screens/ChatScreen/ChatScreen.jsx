import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from "react-native-elements";
import NavBar from '../../NavBar/NavBar';
import Dialog from './Dialog/Dialog';
import { getDialogsTC, pingDialogsTC } from '../../../redux/reducers/dialogs-page-reducer';
import { connect } from 'react-redux';

const ChatScreen = ({navigation, route, dialogs, getDialogs, pingDialogs}) => {

    const [inputValue, setInputValue] = useState("");
    let interval;
    const [dialogsHere, setDialogs] = useState([]);
    useEffect(() => {
        if(!inputValue) {
            setDialogs(dialogs);
        } else {
            setDialogs(dialogs.filter( ({name}) => name.includes(inputValue) ));
        }

    }, [ inputValue ]);

    useEffect(() => {
        getDialogs();
        interval = setInterval(() => {
            pingDialogs();
        }, 1000)

        return () => {
            clearInterval(interval);
        }

    }, []);

    useEffect(() => {
        setDialogs(dialogs);
    }, [dialogs])

    

    return (
        <View style={styles.screen}>
            <View style={styles.search}>
                <TextInput onChange={(e) => { setInputValue(e.nativeEvent.text) }} value={inputValue} placeholder="search" style={styles.input} />
                <TouchableOpacity style={styles.opacity} onPress={() => { setInputValue("") }}>
                    {inputValue != "" && <Icon size={40} name="highlight-off" />}
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.dialogs}>
                {dialogsHere.map( d => <Dialog key={d.pk} {...d} navigation={navigation} /> )}
                {dialogsHere.length == 0 && <Text style={styles.notFound}>Not Found</Text>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    search: {
        height: 80,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingHorizontal: "3%",
        paddingBottom: 5,
    },
    input: {
        width: "70%",
        height: 40,
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "#bbb",
        paddingHorizontal: 10,
    },
    dialogs: {
        height: "90%",
        width: "100%",
        paddingHorizontal: "2%"
    },
    opacity: {
        width: 40,
        height: 40
    },
    notFound: {
        alignSelf: "center"
    }
});

const mapStateToProps = state => ({
    dialogs: state.dialogsPage.dialogs
})

export default connect(mapStateToProps, { getDialogs: getDialogsTC, pingDialogs: pingDialogsTC })(ChatScreen)