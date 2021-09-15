import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Card.module.css';


export default function ForgotPass() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetPass } = useAuth();
  const emailRef = useRef();


  useEffect(() => {
    return () => {
      setLoading(false);
      setError('');
      setSuccess('');
    };
  }, []);


  // handle password reset submission
  async function handleResetPass (e) {
    e.preventDefault();

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await resetPass(emailRef.current.value);
      setSuccess('Password reset email sent');
    }
    catch (err) {
      setError(`Failed to send reset email: ${err.message}`);
    }
    setLoading(false);
  }


  return (
    <div className={styles.ForgotPass}>
      <div className={styles.Card}>
        <h2>Budgeteer Password Reset</h2>
        {error && <div className={styles.Alert}>{error}</div>}
        {success && <div className={styles.Success}>{success}</div>}
        <form className={styles.Form} onSubmit={handleResetPass}>
          <label htmlFor="email">Email:</label><br/>
          <input type="text" id="email" name="email" ref={emailRef} required /><br/>
          <button disabled={loading} type="submit" className={styles.CardSubmit}>Reset Password</button>
        </form>
        <div className={styles.CardPrompt}>
          <Link to="/login" className={styles.CardLink} >Back to log in</Link>
        </div>
      </div>
    </div>
  )
}
