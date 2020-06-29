import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux';
import TopProfileContent from './TopProfileContent/TopProfileContent';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { logoutTC } from '../../../redux/reducers/auth-reducer';
import { getUserThunkCretor } from '../../../redux/reducers/profile-page-reducer';
import { useFocusEffect } from '@react-navigation/native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
  } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';

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
                
                <Menu>
                    <MenuTrigger>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.headerText}>{profile.username}</Text>
                            <Icon name="tune" size={20} color="#000" style={{ marginTop: 4 }} />
                        </View>
                    </MenuTrigger>

                    <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
                        <MenuOption onSelect={ () => { props.logout() } } >
                            <View style={{ height: 30, alignItems: "flex-start", justifyContent: "center" }}>
                                <Text style={{ fontSize: 18, fontWeight: "800" }}>Log Out</Text>
                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>

            </View>
            <ScrollView style={styles.content}>
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
        marginRight: 10
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