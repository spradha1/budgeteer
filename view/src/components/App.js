import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dash from './Dash';
import Login from './Login';
import Signup from './Signup';


function App() {

  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <Route exact path='/' component={Dash}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
