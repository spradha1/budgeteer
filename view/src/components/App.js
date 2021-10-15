import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import Dash from './Dash';
import Ledger from './Ledger';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import ForgotPass from './ForgotPass';


function App() {

  return (
    <div className={styles.App}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Dash}></PrivateRoute>
            <PrivateRoute path='/ledger' component={Ledger}></PrivateRoute>
            <PrivateRoute path='/profile' component={Profile}></PrivateRoute>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={Signup}></Route>
            <Route path='/forgotpass' component={ForgotPass}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
