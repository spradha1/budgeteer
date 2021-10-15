import React from 'react';
import styles from './Loader.module.css';


export default function Loader() {

  return (
    <div className={styles.Loader}>
      <div className={styles.LoaderBox}>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}
