import React from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

export const Input = ({ input, meta, ...props }) => {

    return (
        <TextInput style={styles.input} {...input} {...props}/>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: "#bbb",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        width: "90%",
        fontSize: 16,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
});