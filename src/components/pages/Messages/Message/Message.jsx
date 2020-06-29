import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({align, text, ...props}) => {
    return (
        <View style={StyleSheet.compose( styles.msg ,{ alignSelf: align })}>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    msg: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        maxWidth: "40%",
        minWidth: "20%",
        margin: 10,
        paddingHorizontal: 5,
        paddingVertical: 5
    }
});

export default Message