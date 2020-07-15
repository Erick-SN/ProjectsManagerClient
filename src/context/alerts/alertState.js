import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import { SHOW_ALERT, HIDE_ALERT } from '../../types/index';

const AlertState = (props) => {
  const initialSatate = {
    alert: null,
  };
  const [state, dispatch] = useReducer(alertReducer, initialSatate);
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  };
  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
