import React from 'react';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';
import PrivateRoute from './components/routes/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authSatate';
import tokenAuth from './config/token';

//Check token existence
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <>
      <AuthState>
        <ProjectState>
          <TaskState>
            <AlertState>
              <Router>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/newaccount' component={NewAccount} />
                  <PrivateRoute exact path='/projects' component={Projects} />
                </Switch>
              </Router>
            </AlertState>
          </TaskState>
        </ProjectState>
      </AuthState>
    </>
  );
}

export default App;
