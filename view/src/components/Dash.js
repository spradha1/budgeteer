import React from 'react'
import Navigator from './Navigator';
import styles from './Dash.module.css';


export default function Dash() {

  return (
    <div className={styles.Dashboard}>
      <Navigator />
      <div className={styles.Header}>Dashboard</div>
    </div>
  )
}
