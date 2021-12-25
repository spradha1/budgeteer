import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserData } from '../features/tracker/trackerSlice';
import { useAuth } from '../contexts/AuthContext';
import Navigator from './Navigator';
import Loader from './Loader';
import styles from '../styles/Ledger.module.scss';
import cardStyles from '../styles/Card.module.scss';


export default function Ledger() {

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  
  const expenses = useSelector(state => state.tracker.expenses);
  const income = useSelector(state => state.tracker.income);
  const status = useSelector(state => state.tracker.status);
  const [adding, setAdding] = useState(false);
  const [addType, setAddType] = useState('Expense');

  // async dispatch to fetch data for every edit made
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserData(currentUser.uid));
    }
  }, [status, dispatch, currentUser]);



  // ----------- functions -----------------

  // initiate add expense/income row
  function handleAddRow () {

  }


  // open add form
  function openAddDialog (rowType) {
    setAdding(true);
    setAddType(rowType);
  }




  // ----------------- UI ----------------------------

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
  
  var addFormHTML = [];
  addFormHTML.push(
    <div className={styles.AddField} key="category">
      <label htmlFor="category">Category:</label>
      <input type="text" id="category" name="category" placeholder='Purpose ...'/><br/>
    </div>
  )
  for (let i=0; i<months.length; i++) {
    addFormHTML.push(
      <div className={styles.AddField} key={i}>
        <label htmlFor={i}>{months[i]}:</label>
        <input type="number" id={i} name={i} defaultValue="0"/><br/>
      </div>
    );
  }


  return (
    <div className={`${styles.Ledger} ${adding && styles.Blurred}`}>
      <Navigator />
      <div className={styles.Header}>Ledger</div>
      {status === 'succeeded' ?
        <div className={styles.LedgerContainer}>
          {!adding &&
            <div className={styles.Expenses}>
              <div className={styles.Header}>Expenses</div>
              {monthLine}
              {expensesHTML.map(val => val)}
              <button
                className={styles.Button1}
                onClick={() => openAddDialog('Expense')}
              >
                Add category
              </button>
            </div>
          }
          {!adding &&
            <div className={styles.Income}>
              <div className={styles.Header}>Income</div>
              {monthLine}
            </div>
          }
          {adding &&
            <div className={styles.AddDialog}>
              <div className={styles.AddHeader}>Add New {addType}</div>
              {addFormHTML.map(val => val)}
              <div>
                <button
                  className={styles.Button1}
                  onClick={() => handleAddRow()}
                >
                  Done
                </button>
                <button
                  className={styles.Button1}
                  onClick={() => setAdding(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          }
        </div>
        :
        <Loader />
      }
    </div>
  )
}
