import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navigator from './Navigator';
import { useAuth } from '../contexts/AuthContext';
import { getUserData } from '../features/tracker/trackerSlice';
import styles from '../styles/Profile.module.scss';
import cardStyles from '../styles/Card.module.scss';


export default function Profile() {

  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const status = useSelector(state => state.tracker.status);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();


  // async dispatch to fetch data for every edit made
  useEffect(() => {
    console.log(status);
    if (status === 'idle') {
      dispatch(getUserData(currentUser.uid));
    }
  }, [status, dispatch, currentUser]);


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
      <button
        className={styles.EditButton}
        onClick={() => {
          setEditing(!editing);
          setUpdating(false);
        }}
      >
        {editing ? 'Cancel':'Edit'}
      </button>

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
    </div>
  )
}
