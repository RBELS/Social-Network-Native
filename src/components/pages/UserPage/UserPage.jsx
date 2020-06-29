import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux';
import { logoutTC } from '../../../redux/reducers/auth-reducer';
import { getUserThunkCretor } from '../../../redux/reducers/profile-page-reducer';
import { useFocusEffect } from '@react-navigation/native';
import TopProfileContent from '../../screens/ProfileScreen/TopProfileContent/TopProfileContent';
import ProfileInfo from '../../screens/ProfileScreen/ProfileInfo/ProfileInfo';
import { followTC, unfollowTC } from '../../../redux/reducers/users-page-reducer';
import { Menu } from "react-native-popup-menu";

const UserPage = ({profile, getUser, myUsername, navigation, follow, unfollow, ...props}) => {

    let username;

    const onDirectMessagePress = (username, imgSrc, name) => {
        navigation.navigate("Messages", { username, imgSrc, name });
    }

    useFocusEffect(
        React.useCallback(() => {
          username = props.route.params == undefined ? "" : props.route.params.username;
          getUser(username);
          return () => {

          };
        }, [props.route.params])
    );

    return (
        <View style={styles.screen}>
            <ScrollView style={styles.content}>
                <TopProfileContent profile={profile} />
                <ProfileInfo follow={follow} unfollow={unfollow} onDirectMessagePress={onDirectMessagePress} myUsername={myUsername} profile={profile} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "8%",
        width: "100%",
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
        justifyContent: "center",
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
        profile: state.profilePage.profile,
        myUsername: state.auth.username
    }
}

export default connect(mapStateToProps, { getUser: getUserThunkCretor, follow: followTC, unfollow: unfollowTC })(UserPage);