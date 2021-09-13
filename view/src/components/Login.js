import React, { useState, useRef } from 'react';
import styles from './Card.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Login() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();


  async function handleLogin (e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (err) {
      setError(`Log In failed: ${err.message}`);
    }
    setLoading(false);
  }


  return (
    <div className={styles.Login}>
      <div className={styles.LoginCard}>
        <h2>Budgeteer Login</h2>
        {error && <div className={styles.Alert}>{error}</div>}
        <form className={styles.Form} onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label><br/>
          <input type="text" id="email" name="email" ref={emailRef} required /><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password" ref={passwordRef} required /><br/>
          <button disabled={loading} type="submit" className={styles.LoginSubmit}>Log In</button>
        </form>
        <div>
          Don't have an account? <Link to="/signup" style={{ textDecoration: 'none'}}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}