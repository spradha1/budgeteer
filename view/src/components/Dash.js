import React from 'react'
import Navigator from './Navigator';
import styles from '../styles/Dash.module.scss';


export default function Dash() {

  return (
    <div className={styles.Dashboard}>
      <Navigator />
      <div className={styles.Header}>Dashboard</div>
    </div>
  )
}
