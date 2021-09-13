import React, { useState, useRef, useEffect } from 'react';
import styles from './Card.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Signup() {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();


  useEffect(() => {
    return () => {
      setLoading(false);
      setError('');
    };
  }, []);

  // handle sign up submission
  async function handleSignup (e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then( () => {
        history.push('/');
      });
    } catch (err) {
      setError(`Sign Up failed: ${err.message}`);
    }
    setLoading(false);
  }

  return (
    <div className={styles.Signup}>
      <div className={styles.SignupCard}>
        <h2>Budgeteer Signup</h2>
        {error && <div className={styles.Alert}>{error}</div>}

        <form className={styles.Form} onSubmit={handleSignup}>
          <label htmlFor="email">Email:</label><br/>
          <input type="email" id="email" name="email" ref={emailRef} required /><br/>
          <label htmlFor="password">Password:</label><br/>
          <input type="password" id="password" name="password" ref={passwordRef} required /><br/>
          <label htmlFor="confirmPassword">Confirm password:</label><br/>
          <input type="password" id="confirmPassword" name="confirmPassword" ref={confirmPasswordRef} required /><br/>
          <button disabled={loading} type="submit" className={styles.SignupSubmit}>Sign Up</button>
        </form>

        <div>
          Already have an account? <Link to="/login" style={{ textDecoration: 'none'}}>Log In</Link>
        </div>
      </div>
    </div>
  )
}
