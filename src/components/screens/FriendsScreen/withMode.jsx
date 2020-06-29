import React, { useEffect } from 'react';
import { connect } from "react-redux";
import FriendsView from "./FriendsView/FriendsView";
import { followersTC, followsTC } from "../../../redux/reducers/users-page-reducer";

const WithMode = ({navigation, mode, followers, follows, isFetching, getFollowers, getFollows}) => {
    return <FriendsView friends={mode == 1 ? followers : follows} getFriends={mode == 1 ? getFollowers : getFollows} navigation={navigation} isFetching={isFetching} />;
}

const mapStateToProps = state => ({
    isFetching: state.usersPage.isFetching,
    followers: state.usersPage.followers,
    follows: state.usersPage.follows
})

export default connect(mapStateToProps, { getFollowers: followersTC, getFollows: followsTC })(WithMode)