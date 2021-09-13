import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import Dash from './Dash';
import Login from './Login';
import Signup from './Signup';


function App() {

  return (
    <div className={styles.App}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Dash}></PrivateRoute>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
