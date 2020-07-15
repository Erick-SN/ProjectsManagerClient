import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
const NewProject = () => {
  const projectsContext = useContext(projectContext);
  const { newProject, error, showForm, addProject, onError } = projectsContext;
  /*Project status*/
  const [project, setProject] = useState({
    name: '',
  });
  /*Extraction of variables for manipulation*/
  const { name } = project;
  /*Function that retrieves the values ​​of the form fields*/
  const handleChangeproject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  /*Create task function*/
  const onSubmitProject = (e) => {
    e.preventDefault();
    if (name === '') {
      onError();
      return;
    }
    addProject(project);
    setProject({ name: '' });
  };
  return (
    <>
      <button
        type='button'
        className='btn btn-block btn-primario'
        onClick={() => showForm()}>
        New Project
      </button>
      {newProject ? (
        <form className='formulario-nuevo-proyecto' onSubmit={onSubmitProject}>
          <input
            type='text'
            className='input-text'
            placeholder='Task Name'
            name='name'
            value={name}
            onChange={handleChangeproject}
          />
          <input
            type='submit'
            className='btn btn-block btn-primario'
            value='Add task'
          />
        </form>
      ) : null}
      {error ? <p className='mensaje error'>All inputs are required</p> : null}
    </>
  );
};

export default NewProject;
