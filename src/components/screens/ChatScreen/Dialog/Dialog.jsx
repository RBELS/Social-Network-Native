import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const Dialog = ({imgSrc, name, written, last, navigation, ...props}) => {
    return (
        <TouchableOpacity onPress={ () => { navigation.navigate("Messages", { username: written, imgSrc }) } }>
            <View style={styles.dialog}>
                <Image style={styles.avatar} source={{uri: imgSrc, width: 70, height: 70}} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.last}>{last}</Text>
                </View>
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
    }
});

export default Dialog