import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const ProfileInfo = ({ profile, ...props }) => {
    return (
        <View style={s.info}>
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