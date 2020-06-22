import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export const InputPassword = ({ input, meta, ...props }) => {

    const [mode, setmode] = useState(true);

    return (
        <View style={styles.input}>
            <TextInput style={styles.pwInput} {...input} {...props} secureTextEntry={mode} />
            <TouchableOpacity onPress={() => { setmode(!mode) }}>
                <Icon size={32} name={mode ? 'visibility-off' : 'visibility'}  type="material" color={"#777"} />
            </TouchableOpacity>
        </View>
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
    pwInput: {
        width: "80%",
        fontSize: 16,
    },
});