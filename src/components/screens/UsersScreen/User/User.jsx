import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

const User = ({username, name, imgSrc, navigate, ...props}) => {
    const onUserPress = () => {
        navigate("UserPage", { username });
    }

    return (
        <TouchableOpacity onPress={onUserPress}>
            <View style={styles.user}>
                <Image style={styles.avatar} source={{uri: imgSrc, width: 70, height: 70}} />
                <View style={styles.info}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    user: {
        height: 70,
        flexDirection: "row",
        marginVertical: 6
    },
    info: {
        width: "60%",
        padding: 8,
        justifyContent: "center"
    },
    avatar: {
        borderRadius: 35
    },
    username: {
        fontWeight: "bold",
        fontSize: 16
    },
    name: {
        fontSize: 16,
        color: "#bbb"
    }
})

export default User