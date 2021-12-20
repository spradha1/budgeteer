import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth } from '../contexts/AuthContext';
import { getUserData } from '../features/tracker/trackerSlice';
import Navigator from './Navigator';
import styles from '../styles/Dash.module.scss';


export default function Dash() {

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const status = useSelector(state => state.tracker.status);


  // async dispatch to fetch data for every edit made
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserData(currentUser.uid));
    }
  }, [status, dispatch, currentUser]);


  return (
    <div className={styles.Dashboard}>
      <Navigator />
      <div className={styles.Header}>Dashboard</div>
    </div>
  )
}
