export const Types = {
    GET_REQUEST_LOGIN: 'login/GET_REQUEST_LOGIN',
    GET_SUCSSES: 'login/GET_SUCSSES',

    GET_USER_NAME: 'login/GET_USER_NAME',
    GET__USER_ID: 'login/GET_USER_ID',
    GET_TOKEN: 'login/GET_TOKEN',
  };
  
  const InitialState = {
    userName: null,
    userID: null,
    token: null
  };
  
  export default function LoginState(state = InitialState, action) {
    switch (action.type) {
      case Types.GET_REQUEST_LOGIN:
        return state;
      case Types.GET_SUCSSES:
        return { ...state, userName: action.payload.response.nome, token: action.payload.response.token, userID: action.payload.userID };
      default:
        return state;
    }
  }
  
  export const Creators = {
    getLoginRequest: data => ({
        type: Types.GET_REQUEST_LOGIN,
        payload: { data },
      }),

    getLoginSucsses: (response, userID) => ({
        type: Types.GET_SUCSSES,
        payload: { response, userID },
      }),

    };