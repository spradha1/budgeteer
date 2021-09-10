import React, { useState } from 'react';
import styles from './Card.module.css';
import { Link, useHistory } from 'react-router-dom';


export default function Login() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.Login}>
      <div className={styles.LoginCard}>
        <h2>Budgeteer Login</h2>
        {error && <div className={styles.Alert}>{error}</div>}
        <form className={styles.Form}>
          <label htmlFor="email">Email:</label><br/>
          <input type="text" id="email" name="email" autoComplete='off' required /><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password" required /><br/>
          <button disabled={loading} type="submit" className={styles.LoginSubmit}>Log In</button>
        </form>
        <div>
          Don't have an account? <Link to="/signup" style={{ textDecoration: 'none'}}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}
