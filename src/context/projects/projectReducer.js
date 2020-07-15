import {
  NEW_PROJECT,
  GET_PROJECTS,
  ADD_PEOJECT,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case NEW_PROJECT:
      return { ...state, newProject: true };
    case GET_PROJECTS:
      return { ...state, projects: action.payload };
    case ADD_PEOJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        newProject: false,
        error: false,
      };
    case VALIDATE_FORM:
      return { ...state, error: true };
    case CURRENT_PROJECT:
      return {
        ...state,
        project: state.projects.filter(
          (project) => project._id === action.payload,
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload,
        ),
        project: null,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
