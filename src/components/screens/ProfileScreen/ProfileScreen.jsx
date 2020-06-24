import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux';
import TopProfileContent from './TopProfileContent/TopProfileContent';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { logoutTC } from '../../../redux/reducers/auth-reducer';
import { getUserThunkCretor } from '../../../redux/reducers/profile-page-reducer';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({profile, getUser, ...props}) => {

    let username;

    useFocusEffect(
        React.useCallback(() => {
          username = props.route.params == undefined ? "" : props.route.params.username;
          getUser(username);
          return () => {
            props.route.params = undefined;
          };
        }, [props.route.params])
    );

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{profile.username}</Text>
            </View>
            <ScrollView style={styles.content}>
                <Button onPress={() => { props.logout() }} title="Logout(Temp)"/>{/*TEMP*/}
                <TopProfileContent profile={profile} />
                <ProfileInfo profile={profile} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "8%",
        width: "100%",
        // alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: "5%",
        paddingVertical: 8,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
    },
    screen: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        flexGrow: 1,
        height: "92%",
        width: "100%",
        paddingHorizontal: "3%",
        paddingVertical: "1%",
    },
});



const mapStateToProps = state => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect(mapStateToProps, { logout: logoutTC, getUser: getUserThunkCretor })(ProfileScreen);