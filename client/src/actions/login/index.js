import * as types from '../types';

import io from 'socket.io-client';

export const dispatchLogin = ({ id, password }) => dispatch => {
  fetch('/api/login', {
    method  : 'POST',
    headers : {
                'Content-Type': 'application/json'
              },
    body    : JSON.stringify({
                id      : id,
                password: password,
              })
  })
  .then( res => res.json() )
  .then( data => {
    if (data.status) {
      const socket = io('localhost:4000');
      socket.emit('login', { id: data.id, name: data.name });
      console.log(data);
      return dispatch({
        type: types.LOGIN,
        data: {
          id    : data.user.id,
          name  : data.user.name,
          socket: socket,
        }
      })
    }
    return dispatch({
      type: types.LOGIN_FAIL,
      data : data.msg,
    })
  })
  .catch( err => {
    return dispatch({
      type: types.LOGIN_FAIL,
      data : err.msg,
    })
  })
}
