import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContex';

const FormTask = () => {
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  const tasksContext = useContext(taskContext);
  const {
    selectedTask,
    error,
    getTask,
    addTask,
    onError,
    updateTask,
    cleanTask,
  } = tasksContext;

  const [newTask, setNewTask] = useState({
    name: '',
  });
  const { name } = newTask;

  useEffect(() => {
    if (selectedTask !== null) {
      setNewTask(selectedTask);
    } else {
      setNewTask({ name: '' });
    }
  }, [selectedTask]);

  if (!project) return null;
  const [currentProject] = project;

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      onError();
      return;
    }

    if (selectedTask === null) {
      newTask.project = currentProject._id;
      addTask(newTask);
    } else {
      updateTask(newTask);
      cleanTask();
    }

    getTask(currentProject._id);
    setNewTask({
      name: '',
    });
  };

  return (
    <>
      <div className='formulario'>
        <form onSubmit={onSubmit}>
          <div className='contenedor-input'>
            <input
              type='text'
              className='input-text'
              placeholder='TaskName'
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className='contenedor-input'>
            <input
              type='submit'
              className='btn btn-primario btn-submit btn-block'
              value={selectedTask ? 'Edit task' : 'Add task'}
            />
          </div>
        </form>
        {error ? (
          <p className='mensaje error'>All inputs are required</p>
        ) : null}
      </div>
    </>
  );
};

export default FormTask;
