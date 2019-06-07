export const ERROR = "ERROR";

// action types for login
export const LOGIN = "LOGIN";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SIGNUP = "SIGNUP";
export const NO_SESSION = "NO_SESSION";
export const LOGOUT = "LOGOUT";

// action types for friends
export const GET_FRIENDLIST = "GET_FRIENDLIST";
export const FRIEND_CONNECT = "FRIEND_CONNECT";
export const FRIEND_DISCONNECT = "FRIEND_DISCONNECT";
export const RESET_FRIEND_SUGGESTS = "RESET_FRIEND_SUGGESTS";
export const FRIEND_SUGGEST_FRIENDS = "FRIEND_SUGGEST_FRIENDS";
export const FRIEND_SUGGEST_NOT_FRIENDS = "FRIEND_SUGGEST_NOT_FRIENDS";

// action types for chat
export const GET_MESSAGES = "GET_MESSAGES";
export const GET_MESSAGES_ERR = "GET_MESSAGES_ERR";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const CREATE_CHAT = "CREATE_CHAT";
export const CREATE_CHAT_ERR = "CREATE_CHAT_ERR";
export const EXIT_CHAT = "EXIT_CHAT";
export const GET_CHAT_ROOMS = "GET_CHAT_ROOMS";
export const GET_CHAT_ROOMS_ERR = "GET_CHAT_ROOMS_ERR";
export const LAST_MSG = "LAST_MSG";

// action types for posts
export const GET_POSTS = "GET_POSTS";
export const RSVP_WAIT = "RSVP_WAIT";
export const RSVP_DONE = "RSVP_DONE";
export const NEW_POST = "NEW_POST";
export const RSVP_UPDATE = "RSVP_UPDATE";
export const RESET_POSTS = "RESET_POSTS";

// action types for invitation
export const CREATE_INVITATION = "CREATE_INVITATION";
export const EXIT_INVITATION = "EXIT_INVITATION";
export const GETTING_IMAGES = "GETTING_IMAGES";
export const LOAD_IMAGES = "LOAD_IMAGES";
export const RESTAURANT_NAMES = "RESTAURANT_NAMES";

// action types for upload
export const UPLOAD_RESET = "UPLOAD_RESET";
export const TOGGLE_UPLOAD = "TOGGLE_UPLOAD";
export const UPLOAD_LOADING = "UPLOAD_LOADING";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAIL = "UPLOAD_FAIL";

// action types for account page
export const LOAD_ACCOUNT = "LOAD_ACCOUNT";
export const LOAD_ACCOUNT_ERR = "LOAD_ACCOUNT_ERR";
export const FRIEND_REQUEST = "FRIEND_REQUEST";
export const LOADING_FRIEND = "LOADING_FRIEND";
export const FRIEND_REQUEST_ERR = "FRIEND_REQUEST_ERR";
export const FRIEND_REQUEST_SENT = "FRIEND_REQUEST_SENT";
export const GET_FRIEND_REQUESTS = "GET_FRIEND_REQUESTS";
export const MAKE_FRIENDS = "MAKE_FRIENDS";
export const RESET_ACCOUNT = "RESET_ACCOUNT";
export const PROFILE_IMG_CHANGE = "PROFILE_IMG_CHANGE";
