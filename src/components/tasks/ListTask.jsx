import React, { useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContex';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const ListTask = () => {
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  const tasksContext = useContext(taskContext);
  const { projectTask } = tasksContext;

  if (!project) return <h2>Select a project</h2>;

  const [currentProject] = project;

  return (
    <>
      <h2>{currentProject.name}</h2>
      <ul className='listado-tareas'>
        {projectTask.length === 0 ? (
          <li className='tarea'>
            <p>No tasks</p>
          </li>
        ) : (
          <TransitionGroup>
            {projectTask.map((task) => (
              <CSSTransition key={task._id} timeout={200} classNames='tarea'>
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type='button'
        className='btn btn-eliminar'
        onClick={() => deleteProject(currentProject._id)}>
        Delete Project
      </button>
    </>
  );
};

export default ListTask;
