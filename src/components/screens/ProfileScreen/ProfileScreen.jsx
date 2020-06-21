import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import TopProfileContent from './TopProfileContent/TopProfileContent';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const ProfileScreen = ({profile, ...props}) => {


    return (
        <View style={styles.screen}>
            <ScrollView style={styles.content}>
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
        justifyContent: "center",
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

export default connect(mapStateToProps)(ProfileScreen);