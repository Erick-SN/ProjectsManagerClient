import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../../types/index';
const AuthState = (props) => {
  const initialSatate = {
    token: localStorage.getItem('token'),
    auth: null,
    user: null,
    message: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(authReducer, initialSatate);

  //User register
  const userRegister = async (data) => {
    try {
      const response = await axiosClient.post('/api/users', data);
      //   console.log(response.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      //Get user
      userAuth();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error',
      };
      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };
  //Return the user loged
  const userAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      //Send the token by header
      tokenAuth(token);
    }
    try {
      const response = await axiosClient.get('/api/auth');
      // console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  };

  //User login
  const userLogin = async (data) => {
    try {
      const response = await axiosClient.post('/api/auth', data);
      // console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      //Get user
      userAuth();
    } catch (error) {
      // console.log(error.response.data.msg);
      const alert = {
        msg: error.response.data.msg,
        category: 'alerta-error',
      };
      dispatch({
        type: LOGIN_FAILURE,
        payload: alert,
      });
    }
  };

  //logout
  const userLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  return (
    <authContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        message: state.message,
        loading: state.loading,
        userRegister,
        userLogin,
        userAuth,
        userLogout,
      }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
