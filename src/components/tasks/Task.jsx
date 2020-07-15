import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContex';
import projectContext from '../../context/projects/projectContext';

const Task = ({ task }) => {
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;
  const [currentProject] = project;

  const tasksContext = useContext(taskContext);
  const { deleteTask, getTask, updateTask, selectTask } = tasksContext;

  const onDelete = (id) => {
    deleteTask(id, currentProject._id);
    getTask(currentProject._id);
  };

  const changeTaskState = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    updateTask(task);
  };

  const getCurrentTask = (task) => {
    selectTask(task);
  };

  return (
    <>
      <li className='tarea sombra'>
        <p>{task.name}</p>
        <div className='estado'>
          {task.state ? (
            <button
              type='button'
              className='completo'
              onClick={() => changeTaskState(task)}>
              Complete
            </button>
          ) : (
            <button
              type='button'
              className='incompleto'
              onClick={() => changeTaskState(task)}>
              To do
            </button>
          )}
        </div>
        <div className='acciones'>
          <button
            type='button'
            className='btn btn-primario'
            onClick={() => getCurrentTask(task)}>
            Edit
          </button>
          <button
            type='button'
            className='btn btn-secundario'
            onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

export default Task;
