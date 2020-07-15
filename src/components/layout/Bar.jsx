import React, { useEffect, useContext } from 'react';
import authContext from '../../context/auth/authContext';
const Bar = () => {
  const AuthContext = useContext(authContext);
  const { user, userAuth, userLogout } = AuthContext;
  useEffect(() => {
    userAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <header className='app-header'>
        {user ? (
          <p className='nombre-usuario'>
            Welcome <span>{user.name}</span>
          </p>
        ) : null}

        <nav className='nav-principal'>
          <button
            className='btn btn-blank cerrar-sesion'
            onClick={() => userLogout()}>
            Logout
          </button>
        </nav>
      </header>
    </>
  );
};

export default Bar;
