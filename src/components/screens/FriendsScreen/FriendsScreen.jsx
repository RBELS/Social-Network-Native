import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WithMode from './withMode';

const Tab = createMaterialTopTabNavigator();

const FriendsScreen = ({navigation, route}) => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Follows" >
                {(props) => <WithMode {...props} mode={2} />}
            </Tab.Screen>
            <Tab.Screen name="Followers">
                {(props) => <WithMode {...props} mode={1} />}
            </Tab.Screen>
        </Tab.Navigator>
        // <View style={styles.screen}>
        //     <Text>FriendsScreen</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default FriendsScreen

// connect(state => ({
//     friends: state.usersPage.followers,
//     isFetching: state.usersPage.isFetching
// }), { getFriends: followersTC }
// )