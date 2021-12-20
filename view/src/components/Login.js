import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Card.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Login() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();


  useEffect(() => {
    return () => {
      setLoading(false);
      setError('');
    };
  }, []);

  async function handleLogin (e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (err) {
      console.log(err);
      const errMsg = err.message.split(':');
      setError(`Log In failed: ${errMsg[errMsg.length - 1]}`);
    }
    setLoading(false);
  }


  return (
    <div className={styles.Login}>
      <div className={styles.Card}>
        <h2>Budgeteer Login</h2>
        {error && <div className={styles.Alert}>{error}</div>}
        <form className={styles.Form} onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label><br/>
          <input type="text" id="email" name="email" ref={emailRef} required /><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password" ref={passwordRef} required /><br/>
          <button disabled={loading} type="submit" className={styles.CardSubmit}>Log In</button>
        </form>
        <div className={styles.CardPrompt}>
          Don't have an account? <Link to="/signup" className={styles.CardLink}>Sign up</Link>
        </div>
        <div className={styles.CardPrompt}>
          <Link to="/forgotpass" className={styles.CardLink}>Forgot Password?</Link>
        </div>
      </div>
    </div>
  )
}
