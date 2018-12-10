import * as types from '../types';

export const dispatchGetFriendList = (id) => dispatch => {
  fetch('/api/getFriendList', {
      method : 'POST',
      headers: {
                  'Content-Type': 'application/json'
               },
      body   : JSON.stringify({ id })
  })
  .then(res => res.json())
  .then((data) => {
    return dispatch({
      type: types.GET_FRIENDLIST,
      data
    })
  })
}

function checkFriendIndex(friendConnected, friends) {
  for (let i = 0; i < friends.length; ++i) {
    const friend = friends[i];
    if (friend.id === friendConnected.id)
      return i;
  }
  return -1;
}

export const dispatchFriendConnect = (friend, friends) => dispatch => {
  const index = checkFriendIndex(friend, friends.offlineFriends);
  if (index === -1) {
    const onlineFriends = [ friends, ...friends.onlineFriends ];
    const offlineFriends = [ ...offlineFriends.splice(index, 1) ];
    return dispatch({
      type: types.FRIEND_CONNECT,
      data: { onlineFriends, offlineFriends }
    })
  }
}

export const dispatchFriendDisconnect = (friend, friends) => dispatch => {
  const index = checkFriendIndex(friend, friends.onlineFriends);
  if (index === -1) {
    const onlineFriends = [ ...onlineFriends.splice(index, 1) ];
    const offlineFriends = [ friends, ...friends.offlineFriends ];
    return dispatch({
      type: types.FRIEND_DISCONNECT,
      data: { onlineFriends, offlineFriends }
    })
  }
}
