import * as types from '../types';

export const dispatchGetFriendList = (id, loaded) => dispatch => {
  fetch('/api/getFriendList', {
      method : 'POST',
      headers: {
                  'Content-Type': 'application/json'
               },
      body   : JSON.stringify({ id })
  })
  .then(res => res.json())
  .then((data) => {
    dispatch({
      type: types.GET_FRIENDLIST,
      data
    });
    loaded();
  })
}

function checkFriendIndex(friendConnected, friends) {
  for (let i = 0; i < friends.length; ++i) {
    const friend = friends[i];
    if (friend.id === friendConnected.id) {
      return i;
    }
  }
  return -1;
}

export const dispatchFriendConnect = (friend, friends) => dispatch => {
  let index = checkFriendIndex(friend, friends.onlineFriends);
  if (index === -1) {
    index = checkFriendIndex(friend, friends.offlineFriends);
    const onlineFriends = [ friend, ...friends.onlineFriends ];
    let offlineFriends = [ ...friends.offlineFriends ];
    if (index !== -1) {
      offlineFriends.splice(index, 1);
    }
    return dispatch({
      type: types.FRIEND_CONNECT,
      data: { onlineFriends, offlineFriends }
    })
  }
}

export const dispatchFriendDisconnect = (friend, friends) => dispatch => {
  let index = checkFriendIndex(friend, friends.offlineFriends);
  if (index === -1) {
    index = checkFriendIndex(friend, friends.onlineFriends);
    let onlineFriends = [ ...friends.onlineFriends ];
    if (index !== -1) {
      onlineFriends.splice(index, 1);
    }
    const offlineFriends = [ friend, ...friends.offlineFriends ];
    return dispatch({
      type: types.FRIEND_DISCONNECT,
      data: { onlineFriends, offlineFriends }
    })
  }
}

export const dispatchFriendSearch = (name, success, err) => dispatch => {
  fetch(`/api/friendSearch/${name}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({
        type: types.FRIEND_SUGGEST,
        data: data.result
      })
      return success();
    }
    return err();
  });
}
