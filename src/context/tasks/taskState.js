import React, { useReducer } from 'react';
import taskContext from './taskContex';
import taskReducer from './taskReducer';
import axiosClient from '../../config/axios';
import {
  PROJECT_TASKS,
  ADD_NEW_TASK,
  VALIDATE_FORM_TASK,
  DELETE_TASK,
  CURREENT_TASK,
  UPDATE_TASK,
  CLEAN,
} from '../../types';

const TaskState = (props) => {
  const initialSatate = {
    projectTask: [],
    error: false,
    selectedTask: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialSatate);

  //Get task by a single projectId

  const getTask = async (project) => {
    try {
      const response = await axiosClient.get('/api/tasks', {
        params: { project },
      });
      // console.log(response);
      dispatch({
        type: PROJECT_TASKS,
        payload: response.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addTask = async (task) => {
    try {
      const response = await axiosClient.post('/api/tasks', task);
      // console.log(response.data.task);
      dispatch({
        type: ADD_NEW_TASK,
        payload: response.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onError = () => {
    dispatch({ type: VALIDATE_FORM_TASK });
  };

  const deleteTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { project } });
      dispatch({ type: DELETE_TASK, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      // console.log(task);
      const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
      // console.log(response);
      dispatch({ type: UPDATE_TASK, payload: response.data.task });
    } catch (error) {
      console.log(error);
    }
  };

  const selectTask = (task) => {
    dispatch({ type: CURREENT_TASK, payload: task });
  };

  const cleanTask = () => {
    dispatch({ type: CLEAN });
  };

  return (
    <taskContext.Provider
      value={{
        projectTask: state.projectTask,
        error: state.error,
        selectedTask: state.selectedTask,
        getTask,
        addTask,
        onError,
        deleteTask,
        selectTask,
        updateTask,
        cleanTask,
      }}>
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
