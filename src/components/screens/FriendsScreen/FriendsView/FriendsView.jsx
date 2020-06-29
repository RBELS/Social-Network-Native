import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Fetching from '../../../Fetching/Fetching';
import User from '../../UsersScreen/User/User';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

const FriendsView = ({navigation, friends, getFriends, isFetching, ...props}) => {
    // debugger

    const [inputValue, setInputValue] = useState("");
    const [page, setpage] = useState(1);

    useEffect(() => {
        getFriends(page,100,inputValue,false);
    }, [inputValue]);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            getFriends(1, 100, inputValue, false);
            setpage(1);
        }, [])
    );

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <TextInput value={inputValue} onChange={(e) => { setInputValue(e.nativeEvent.text) }} placeholder="search" style={styles.search} />
                <TouchableOpacity style={styles.opacity} onPress={() => { setInputValue("") }}>
                    {inputValue != "" && <Icon size={40} name="highlight-off" />}
                </TouchableOpacity>
            </View>
            <ScrollView scrollEventThrottle={100} style={styles.users}>
                { friends.map(({pk,imgSrc,name,username}) => <User key={pk} navigate={navigation.navigate} imgSrc={imgSrc} name={name} username={username} />) }
                {isFetching && <Fetching />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        alignItems: "center",
    },
    header: {
        height: "8%",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingHorizontal: "3%",
        paddingBottom: 5,
    },
    users: {
        width: "100%",
        paddingHorizontal: "2%",
    },
    search: {
        width: "70%",
        height: 40,
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "#bbb",
        paddingHorizontal: 10
    },
    opacity: {
        width: 40,
        height: 40
    }
});



export default (FriendsView)