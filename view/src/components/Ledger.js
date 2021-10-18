import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../features/tracker/trackerSlice';
import Navigator from './Navigator';
import Loader from './Loader';
import styles from '../styles/Ledger.module.scss';


export default function Ledger() {

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.tracker.expenses);
  const income = useSelector(state => state.tracker.income);
  const status = useSelector(state => state.tracker.status);


  // async dispatch to fetch data for every
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserData(currentUser.uid));
    }
  }, [status, dispatch, currentUser])
  

  return (
    <div className={styles.Ledger}>
      <Navigator />
      <div className={styles.Header}>Ledger</div>
      {status === 'succeeded' ?
        <div className={styles.LedgerContainer}>
          <div className={styles.Expenses}>
            <div className={styles.Header}>Expenses</div>
            {expenses.Rent.Jan}
          </div>
          <div className={styles.Income}>
            <div className={styles.Header}>Income</div>
            {income.Salary.Feb}
          </div>
        </div>
        :
        <Loader />
      }
    </div>
  )
}
