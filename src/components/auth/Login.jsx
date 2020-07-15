import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alerts/alertContext';
const Login = (props) => {
  const AuthContext = useContext(authContext);
  const { message, auth, userLogin } = AuthContext;

  const AlertContext = useContext(alertContext);
  const { alert, showAlert } = AlertContext;

  useEffect(() => {
    if (auth) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, auth, props.history]);

  /*Login status*/
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  /*Extraction of variables for manipulation*/
  const { email, password } = user;

  /*Function that retrieves the values ​​of the form fields*/
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  /*LogIn function*/
  const onSubmit = (e) => {
    e.preventDefault();
    /*Validation*/
    if (email.trim() === '' || password.trim() === '') {
      showAlert('All inputs are required.', 'alerta-error');
      return;
    }
    userLogin({ email, password });
  };
  return (
    <>
      <div className='form-usuario'>
        {alert ? (
          <div className={`alerta ${alert.category}`}>{alert.msg}</div>
        ) : null}
        <div className='contenedor-form sombra-dark'>
          <h1>Log in</h1>
          <form onSubmit={onSubmit}>
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
            <div className='compo-form'>
              <input
                type='submit'
                className='btn btn-primario btn-block'
                value='Log in'
              />
            </div>
          </form>
          <Link to='/newaccount' className='enlace-cuenta'>
            Get account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
