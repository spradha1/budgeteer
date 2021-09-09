import React, { useState } from 'react';
import styles from './Card.module.css';
import { Link, useHistory } from 'react-router-dom';


export default function Signup() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.Signup}>
      <div className={styles.SignupCard}>
        <h2>Budgeteer Signup</h2>
        {error && <div className={styles.Alert}>{error}</div>}
        <form className={styles.Form}>
          <label htmlFor="email">Email:</label><br/>
          <input type="text" id="email" name="email" autoComplete='off' /><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password" /><br/>
          <label htmlFor="confirmPassword">Confirm password:</label><br/>
          <input type="confirmPassword" id="confirmPassword" name="confirmPassword" /><br/>
          <button disabled={loading} type="submit" className={styles.SignupSubmit}>Sign Up</button>
        </form>
        <div>
          Have an account? <Link to="/login" style={{ textDecoration: 'none'}}>Log In</Link>
        </div>
      </div>
    </div>
  )
}
