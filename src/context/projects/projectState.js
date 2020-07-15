import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import axiosClient from '../../config/axios';
import {
  NEW_PROJECT,
  GET_PROJECTS,
  ADD_PEOJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from '../../types';

const ProjectState = (props) => {
  const initialSatate = {
    newProject: false,
    projects: [],
    error: false,
    project: null,
    message: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialSatate);

  const showForm = () => {
    dispatch({ type: NEW_PROJECT });
  };

  const getProjects = async () => {
    try {
      const response = await axiosClient.get('/api/projects');
      // console.log(response.data);
      dispatch({
        type: GET_PROJECTS,
        payload: response.data.projects,
      });
    } catch (error) {
      // console.log(error);
      const alert = {
        msg: 'Something went wrong',
        category: 'alerta-error',
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  const addProject = async (project) => {
    try {
      const response = await axiosClient.post('/api/projects', project);
      // console.log(response.data.project);
      dispatch({
        type: ADD_PEOJECT,
        payload: response.data.project,
      });
    } catch (error) {
      // console.log(error);
      const alert = {
        msg: 'Something went wrong',
        category: 'alerta-error',
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  const onError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  const selectProject = (projectId) => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId,
    });
  };

  const deleteProject = async (projectId) => {
    try {
      await axiosClient.delete(`/api/projects/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      // console.log(error);
      const alert = {
        msg: 'Something went wrong',
        category: 'alerta-error',
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };
  return (
    <projectContext.Provider
      value={{
        newProject: state.newProject,
        projects: state.projects,
        error: state.error,
        project: state.project,
        message: state.message,
        showForm,
        getProjects,
        addProject,
        onError,
        selectProject,
        deleteProject,
      }}>
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
