import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const Dialog = ({imgSrc, name, written, last, navigation, unread, ...props}) => {
    return (
        <TouchableOpacity onPress={ () => { navigation.navigate("Messages", { username: written, imgSrc, name }) } }>
            <View style={styles.dialog}>
                <Image style={styles.avatar} source={{uri: imgSrc, width: 70, height: 70}} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.last}>{last}</Text>
                </View>
                {unread != 0 && <View style={styles.unread}></View>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dialog: {
        width: "100%",
        height: 70,
        marginVertical: 6,
        flexDirection: "row"
    },
    avatar: {
        borderRadius: 35
    },
    info: {
        width: "60%",
        padding: 8,
        justifyContent: "center"
    },
    name: {
        fontSize: 16,
        fontWeight: "bold"
    },
    last: {
        fontSize: 16,
        overflow: "hidden",
        height: 26,
    },
    unread: {
        width: 10,
        height: 10,
        backgroundColor: "#00cc4e",
        alignSelf: "center",
        borderRadius:5
    }
});

export default Dialog