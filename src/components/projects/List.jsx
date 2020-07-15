import React, { useContext, useEffect } from 'react';
import Project from './Project.jsx';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const List = () => {
  const projectsContext = useContext(projectContext);
  const { message, projects, getProjects } = projectsContext;

  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }
    getProjects();
    // eslint-disable-next-line
  }, [message]);
  if (projects.length === 0) return <p>NO projects created yet</p>;

  return (
    <>
      <ul className='listado-proyectos'>
        {alert ? (
          <div className={`alerta ${alert.category}`}>{alert.msg}</div>
        ) : null}
        <TransitionGroup>
          {projects.map((project) => (
            <CSSTransition
              key={project._id}
              timeout={200}
              classNames='proyecto'>
              <Project project={project} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </>
  );
};

export default List;
