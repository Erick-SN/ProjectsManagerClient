import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/auth/authContext';
const NewAccount = (props) => {
  const authsContext = useContext(authContext);
  const { message, auth, userRegister } = authsContext;

  const alertsContext = useContext(alertContext);
  const { alert, showAlert } = alertsContext;

  //User registration or user duplicate
  useEffect(() => {
    if (auth) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, auth, props.history]);

  /*Sign up status*/
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  /*Extraction of variables for manipulation*/
  const { name, email, password, confirm } = newUser;

  /*Function that retrieves the values ​​of the form fields*/
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  /*SignUn function*/
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirm.trim() === ''
    ) {
      showAlert('All inputs are required', 'alerta-error');
      return;
    }
    if (password.length < 6) {
      showAlert('Password must be at least 6 characters', 'alerta-error');
      return;
    }
    if (password !== confirm) {
      showAlert('Password must be the same', 'alerta-error');
      return;
    }
    userRegister({ name, email, password });
  };
  return (
    <>
      <div className='form-usuario'>
        {alert ? (
          <div className={`alerta ${alert.category}`}> {alert.msg} </div>
        ) : null}
        <div className='contenedor-form sombra-dark'>
          <h1>Sign up</h1>
          <form onSubmit={onSubmit}>
            <div className='campo-form'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className='campo-form'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className='campo-form'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className='campo-form'>
              <label htmlFor='confirm'>Confirm</label>
              <input
                type='password'
                id='confirm'
                name='confirm'
                placeholder='Confirm password'
                value={confirm}
                onChange={handleChange}
              />
            </div>

            <div className='compo-form'>
              <input
                type='submit'
                className='btn btn-primario btn-block'
                value='Sign up'
              />
            </div>
          </form>
          <Link to='/' className='enlace-cuenta'>
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewAccount;
