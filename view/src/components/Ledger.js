import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserData } from '../features/tracker/trackerSlice';
import { useAuth } from '../contexts/AuthContext';
import Navigator from './Navigator';
import Loader from './Loader';
import styles from '../styles/Ledger.module.scss';


export default function Ledger() {

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  
  const expenses = useSelector(state => state.tracker.expenses);
  const income = useSelector(state => state.tracker.income);
  const status = useSelector(state => state.tracker.status);

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthLine = (
    <div className={`${styles.Row} ${styles.MonthLine}`}>
      <div className={styles.Key}>Months</div>
      {months.map((ele, idx) => {
        return (
          <div key={idx} className={styles.Val}>{ele}</div>
        )
      })}
    </div>
  );
  
  var expensesHTML = [];
  for (const [key, value] of Object.entries(expenses)) {
    expensesHTML.push(
      <div className={styles.Row} key={expensesHTML.length}>
        <div className={styles.Key}>{key}</div>
        {value.map((ele, idx) => {
          return (
            <div key={idx} className={styles.Val}>{ele}</div>
          )
        })}
      </div>
    );
  }


  // async dispatch to fetch data for every edit made
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserData(currentUser.uid));
    }
  }, [status, dispatch, currentUser]);
  

  return (
    <div className={styles.Ledger}>
      <Navigator />
      <div className={styles.Header}>Ledger</div>
      {status === 'succeeded' ?
        <div className={styles.LedgerContainer}>
          <div className={styles.Expenses}>
            <div className={styles.Header}>Expenses</div>
            {monthLine}
            {expensesHTML.map(val => val)}
          </div>
          <div className={styles.Income}>
            <div className={styles.Header}>Income</div>
            {monthLine}
          </div>
        </div>
        :
        <Loader />
      }
    </div>
  )
}
