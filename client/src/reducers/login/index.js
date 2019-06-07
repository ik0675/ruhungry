import * as types from "../../actions/types";

const initialState = {
  id: "",
  name: "",
  userImg: "",
  socket: null,
  isLogin: "pending",
  msg: null
};

export default function loginReducers(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        id: action.data.id,
        name: action.data.name,
        userImg: action.data.userImg,
        socket: action.data.socket,
        isLogin: "true",
        msg: null
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        msg: action.data
      };
    case types.SIGNUP:
      return {
        ...state,
        msg: action.data
      };
    case types.NO_SESSION:
      return {
        ...state,
        isLogin: "false"
      };
    case types.LOGOUT:
      return {
        ...initialState,
        isLogin: "false"
      };
    case types.PROFILE_IMG_CHANGE:
      return {
        ...state,
        userImg: action.data
      };
    default:
      return state;
  }
}
