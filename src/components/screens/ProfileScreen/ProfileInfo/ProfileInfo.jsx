import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

const ProfileInfo = ({ profile, myUsername, onDirectMessagePress, follow, unfollow, ...props }) => {
    return (
        <View style={s.info}>
            {profile.username != myUsername && myUsername && <>
                <Button onPress={() => { onDirectMessagePress(profile.username, profile.imgSrc, profile.name) }} title="Direct message" />
                <Button onPress={() => { 
                    if(profile.followed) {
                        unfollow(profile.username);
                    } else {
                        follow(profile.username);
                    }
                 }} title={ profile.followed ? "Unfollow" : "Follow" } />
            </>}
            <Text style={s.header}>Info:</Text>
            <View style={s.infoEl}>
                <Text>{`${profile.country}, ${profile.city}`}</Text>
            </View>
            <View style={s.infoEl}>
                <Text>{`Date Of Birth: ${profile.dob}`}</Text>
            </View>
            <View style={s.infoEl}>
                <Text>{`Education: ${profile.edu}`}</Text>
            </View>
            <View style={s.infoEl}>
                <Text>{`Website: ${profile.website}`}</Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    info: {
        width: "100%",
    },
    infoEl: {
        paddingVertical: 5,
        paddingLeft: 20
    },
    header: {
        fontSize: 18
    }
})

export default ProfileInfo