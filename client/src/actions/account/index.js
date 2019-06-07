import * as types from "../types";

export const dispatchLoadAccountInfo = (id, loaded) => dispatch => {
  dispatch({ type: types.RESET_ACCOUNT });
  dispatch({ type: types.RESET_POSTS });
  fetch(`/api/loadAccount/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        dispatch({
          type: types.LOAD_ACCOUNT,
          data: {
            id: data.id,
            name: data.name,
            userImg: data.userImg,
            friendStatus: data.friendStatus
          }
        });
      } else {
        dispatch({ type: types.LOAD_ACCOUNT_ERR });
      }
      return loaded();
    });
};

export const dispatchFriendRequest = (friend_id, loaded) => dispatch => {
  fetch("/api/friendRequest", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ friend_id })
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: types.FRIEND_REQUEST_SENT,
        data: data.status
      });
      loaded();
    });
};

export const dispatchGetFriendRequests = handleLoaded => dispatch => {
  fetch("/api/getFriendRequests")
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        dispatch({
          type: types.GET_FRIEND_REQUESTS,
          data: data.friendRequests
        });
        handleLoaded();
      }
      return dispatch({ type: types.LOAD_ACCOUNT_ERR });
    });
};

export const dispatchMakeFriends = (
  num,
  id,
  requestId,
  status,
  index,
  socket
) => dispatch => {
  fetch("/api/makeFriends", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ num, requestId, status })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        // friend added successfully. Send socket msg
        socket.emit("newFriend", { id, requestId });
        return dispatch({ type: types.MAKE_FRIENDS, data: index });
      }
      return dispatch({ type: types.LOAD_ACCOUNT_ERR });
    });
};

export const dispatchProfileImgChange = img => dispatch => {
  return dispatch({ type: types.PROFILE_IMG_CHANGE, data: img });
};
