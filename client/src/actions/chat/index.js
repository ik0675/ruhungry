import * as types from '../types';

export const dispatchCreateChat = ids => dispatch => {
  const queryIds = JSON.stringify(ids);
  fetch(`/api/getChatNumber?ids=${queryIds}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      // create or resume chat
      ids.splice(0, 1);
      dispatch({
        type: types.EXIT_CHAT,
      })
      return dispatch({
        type: types.CREATE_CHAT,
        data: {
          chatId: data.chat_id,
          ids   : ids
        }
      })
    } else {
      // err
      dispatch({
        type: types.CREATE_CHAT_ERR
      })
    }
  })
}

export const dispatchExitChat = _ => dispatch => {
  return dispatch({
    type: types.EXIT_CHAT
  })
}

export const dispatchSendMessage = (data, socket) => dispatch => {
  fetch('/api/sendMessage', {
    method  : 'POST',
    headers : { 'content-type' : 'application/json' },
    body    : JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.status) {
      const messageData = {
        chatId  : data.chat_id,
        id      : data.id,
        name    : res.name,
        message : data.message,
        sentAt  : res.sentAt,
      }
      // send socket emit
      socket.emit('sendMessage', messageData);
      dispatch({
        type: types.NEW_MESSAGE,
        data: messageData
      })
    }
  })
}

export const dispatchReceiveMessage = (data) => dispatch => {
  dispatch({
    type: types.RECEIVE_MESSAGE,
    data
  })
}

export const dispatchGetMessages = (chat_id, offset) => dispatch => {
  fetch(`/api/getMessages?chat_id=${chat_id}&offset=${offset}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({
        type: types.GET_MESSAGES,
        data: data.messages
      })
    } else {
      dispatch({
        type: types.GET_MESSAGES_ERR,
      })
    }
  })
}

export const dispatchGetChatRooms = (success, err) => dispatch => {
  fetch('/api/getChatRooms')
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({
        type: types.GET_CHAT_ROOMS,
        data: data.chatRooms
      });
      return success();
    }
    return err();
  })
}

export const dispatchGetLastMsg = (chat_id, success, err) => dispatch => {
  fetch(`/api/getLastMsg/${chat_id}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      dispatch({
        type  : types.LAST_MSG,
        data  : data.msg,
        chatId: chat_id,
      });
      return success();
    }
    return err();
  })
}
