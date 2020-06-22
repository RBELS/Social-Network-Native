import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import Colors from '../../../assets/colors'
import { useLinkProps } from '@react-navigation/native';

const defaultColor = Colors.nav.icons.color, 
    activeColor = Colors.nav.icons.activeColor;

const NavBar = ({state, ...props}) => {
    let index = state.index;
    // console.log(index);
    return (
        <View style={styles.bar}>
            <TouchableOpacity onPress={() => { props.navigation.navigate("Users") }}>
                <Icon name="explore" color={ index == 0 ? activeColor : defaultColor } type="material" size={32}/>{/*users*/}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.navigation.navigate("Friends") }}>
                <Icon name="group" color={ index == 1 ? activeColor : defaultColor } type="material" size={32}/>{/*friends*/}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.navigation.navigate("Chat") }}>
                <Icon name="chat" color={ index == 2 ? activeColor : defaultColor } type="material" size={32}/>{/*chat*/}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.navigation.navigate("Profile") }}>
                <Icon name="portrait" color={ index == 3 ? activeColor : defaultColor } type="material" size={32}/>{/*profile*/}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: "#FFF",
        height: "6%",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
        elevation: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
});

export default NavBar