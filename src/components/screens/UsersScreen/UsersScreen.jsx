import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import User from './User/User';
import { connect } from 'react-redux';
import { getUsersTC, appendUsersTC } from '../../../redux/reducers/users-page-reducer';
import { Icon } from 'react-native-elements';
import Fetching from '../../Fetching/Fetching';

const mode = 1,
    pageEls = 14;

const UsersScreen = ({navigation, route, users, getUsers, appendUsers, isFetching}) => {

    const onScroll = (e) => {
        if(e.nativeEvent.contentOffset.y / 410 > page) {
            setpage(page+1);
            appendUsers(page+1,pageEls,mode,inputValue);
            console.log("set");
        }
    }

    const [inputValue, setInputValue] = useState("");
    const [page, setpage] = useState(1);

    useEffect(() => {
        getUsers(1,pageEls,mode,inputValue);
        setpage(1);
    }, [inputValue])

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                {/* <Icon size={40} name="search" /> */}
                <TextInput onChange={(e) => { setInputValue(e.nativeEvent.text) }} value={inputValue} placeholder="search" style={styles.search} />
                <TouchableOpacity style={styles.opacity} onPress={() => { setInputValue("") }}>
                    {inputValue != "" && <Icon size={40} name="highlight-off" />}
                </TouchableOpacity>
            </View>
            <ScrollView scrollEventThrottle={100} onScroll={onScroll} style={styles.users}>
                { users.map(({pk,imgSrc,name,username}) => <User key={pk} navigate={navigation.navigate} imgSrc={imgSrc} name={name} username={username} />) }
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
        height: 80,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "flex-end",
        flexDirection: "row",
        paddingHorizontal: "3%",
        paddingBottom: 5
    },
    users: {
        height: "90%",
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

const mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, { getUsers: getUsersTC, appendUsers: appendUsersTC })(UsersScreen)