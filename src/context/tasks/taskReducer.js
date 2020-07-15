import {
  PROJECT_TASKS,
  ADD_NEW_TASK,
  VALIDATE_FORM_TASK,
  DELETE_TASK,
  CURREENT_TASK,
  UPDATE_TASK,
  CLEAN,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTask: action.payload,
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        projectTask: [action.payload, ...state.projectTask],
        error: false,
      };
    case VALIDATE_FORM_TASK:
      return { ...state, error: true };
    case DELETE_TASK:
      return {
        ...state,
        projectTask: state.projectTask.filter(
          (task) => task._id !== action.payload,
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        projectTask: state.projectTask.map((task) =>
          task._id === action.payload._id ? action.payload : task,
        ),
      };
    case CURREENT_TASK:
      return { ...state, selectedTask: action.payload };
    case CLEAN:
      return { ...state, selectedTask: null };
    default:
      return state;
  }
};
