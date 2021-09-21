import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigator from './Navigator';
import styles from './Profile.module.css';
import cardStyles from './Card.module.css';


export default function Profile() {

  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();


  // handle update profile
  function handleUpdateProfile (e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setUpdating(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setEditing(false);
      })
      .catch((err) => {
        setError(`Failed to update: ${err.message}`);
      })
      .finally(() => {
        setUpdating(false);
      });
  }


  return (
    <div className={styles.Profile}>
      <Navigator />
      <div className={styles.Header}>Profile</div>
      {editing ?
        <div className={styles.EditProfile}>
          {error && <div className={cardStyles.Alert}>{error}</div>}
          <form className={cardStyles.Form} onSubmit={handleUpdateProfile}>
            <label htmlFor="email">Email:</label><br/>
            <input type="text" id="email" name="email" ref={emailRef} defaultValue={currentUser.email} required /><br/>
            <label htmlFor="password">Password:</label><br/>
            <input type="password" id="password" name="password" ref={passwordRef} placeholder="Leave empty to keep same" /><br/>
            <label htmlFor="confirmPassword">Confirm password:</label><br/>
            <input type="password" id="confirmPassword" name="confirmPassword" ref={confirmPasswordRef} placeholder="Leave empty to keep same" /><br/>
            <button disabled={updating} type="submit" className={cardStyles.CardSubmit}>Update</button>
          </form>
        </div>
      :
        <div className={styles.ProfileSub}>
          <div className={styles.ProfileRow}>
            <div>Email</div>
            <div>{currentUser.email}</div>
          </div>
        </div>
      }
      <button type='button' className={styles.EditButton} onClick={() => setEditing(!editing)}>{editing ? 'Cancel':'Edit'}</button>
    </div>
  )
}