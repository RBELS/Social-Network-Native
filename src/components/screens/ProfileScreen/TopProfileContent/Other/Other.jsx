import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Other = ({ option, value }) => {
    return (
        <View style={styles.cont}>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.option}>{option}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        width: "30%",
        height: "80%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    option: {

    },
    value: {
        fontSize: 20
    }
});

export default Other;