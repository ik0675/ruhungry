import * as types from "../types";

import io from "socket.io-client";

export const dispatchLogin = ({ id, password }) => dispatch => {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        const socket = io("/");
        socket.emit("login", { id: data.user.id, name: data.user.name });
        return dispatch({
          type: types.LOGIN,
          data: {
            id: data.user.id,
            name: data.user.name,
            userImg: data.user.userImg,
            socket: socket
          }
        });
      }

      return dispatch({
        type: types.LOGIN_FAIL,
        data: {
          status: data.status,
          msg: data.msg
        }
      });
    })
    .catch(err => console.log(err));
};

export const dispatchSignup = user => dispatch => {
  fetch("/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: types.SIGNUP,
        data: {
          status: data.status,
          msg: data.msg
        }
      });
    })
    .catch(err => console.log(err));
};

export const dispatchCheckSession = () => dispatch => {
  fetch("/api/session")
    .then(res => res.json())
    .then(data => {
      if (!data.status) {
        return dispatch({ type: types.NO_SESSION });
      }

      const socket = io("/");
      socket.emit("login", { id: data.user.id, name: data.user.name });
      return dispatch({
        type: types.LOGIN,
        data: {
          id: data.user.id,
          name: data.user.name,
          userImg: data.user.userImg,
          socket: socket
        }
      });
    })
    .catch(err => console.error(err));
};

export const dispatchLogout = socket => dispatch => {
  fetch("/api/logout").then(() => {
    socket.emit("logout");
    dispatch({ type: types.LOGOUT });
  });
};
