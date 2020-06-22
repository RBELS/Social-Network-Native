import React from 'react'
import { View, Image, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Other from './Other/Other';

const TopProfileContent = ({ profile, ...props }) => {
    return (
        <View style={styles.topContent}>
            <Image style={styles.avatar} source={{uri: profile.imgSrc, width: 160, height: 160 }}/>
            <View style={styles.topInfo}>
                <View style={styles.name}>
                    <Text style={styles.nameTxt}>{profile.name}</Text>
                </View>
                <View style={styles.others}>
                    <Other option={"Posts"} value={profile.posts} />
                    <Other option={"Followers"} value={profile.followers} />
                    <Other option={"Follows"} value={profile.follows} />
                </View>
                <View style={styles.status}>
                    <Text style={styles.statusText}>{profile.status}</Text>{/*Max 40 symbols*/}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContent: {
        width: "100%",
        height: 180,
        flexDirection: "row"
    },
    avatar: {
        borderRadius: 1000
    },
    topInfo: {
        width: "60%"
    },
    others: {
        height: "33.33333333%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    name: {
        height: "33.33333333%",
        alignItems: "center",
        justifyContent: "center"
    },
    nameTxt: {
        fontSize: 26,
        paddingBottom: "5%"
    },
    status: {
        alignItems: "center",
        justifyContent: "center",
        height: "33%",
    },
    statusText: {
        fontSize: 16
    }
});

export default TopProfileContent