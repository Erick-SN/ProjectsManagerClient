import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';
import authContext from '../../context/auth/authContext';
const Projects = () => {
  const AuthContext = useContext(authContext);
  const { userAuth } = AuthContext;
  useEffect(() => {
    userAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className='contenedor-app'>
        <Sidebar />
        <div className='seccion-principal'>
          <Bar />
          <main>
            <FormTask />
            <div className='contenedor-tareass'>
              <ListTask />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Projects;
