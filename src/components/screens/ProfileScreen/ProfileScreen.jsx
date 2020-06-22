import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux';
import TopProfileContent from './TopProfileContent/TopProfileContent';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { logoutTC } from '../../../redux/reducers/auth-reducer';
import { getUserThunkCretor } from '../../../redux/reducers/profile-page-reducer';

const ProfileScreen = ({profile, getUser, ...props}) => {

    useEffect(() => {
        getUser("");
    }, []);

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.content}>
                <Button onPress={() => { props.logout() }} title="Logout(Temp)"/>{/*TEMP*/}
                <TopProfileContent profile={profile} />
                <ProfileInfo profile={profile} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        flexGrow: 1,
        height: "100%",
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