import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContex';

const Project = ({ project }) => {
  const projectsContext = useContext(projectContext);
  const { selectProject } = projectsContext;

  const tasksContext = useContext(taskContext);
  const { getTask } = tasksContext;

  const getCurrentProject = (id) => {
    selectProject(id); //Get  current project
    getTask(id); // Get tasks from the selected project
  };
  return (
    <>
      <li>
        <button
          type='button'
          className='btn btn-blank'
          onClick={() => getCurrentProject(project._id)}>
          {project.name}
        </button>
      </li>
    </>
  );
};

export default Project;
