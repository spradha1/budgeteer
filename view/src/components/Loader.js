import React from 'react';
import styles from '../styles/Loader.module.scss';


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
