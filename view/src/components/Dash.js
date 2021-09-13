import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import Navigator from './Navigator';
import styles from './Dash.module.css';

export default function Dash() {

  const { currentUser } = useAuth();
  return (
    <div className={styles.Dashboard}>
      <Navigator />
      {currentUser.email}
    </div>
  )
}
