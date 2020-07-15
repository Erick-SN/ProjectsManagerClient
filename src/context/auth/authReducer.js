import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../../types/index';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return { ...state, auth: true, message: null, loading: false };
    case LOGIN_FAILURE:
    case REGISTER_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        message: action.payload,
        user: null,
        auth: null,
        loading: false,
      };
    case GET_USER:
      return { ...state, user: action.payload, auth: true, loading: false };
    default:
      return state;
  }
};
