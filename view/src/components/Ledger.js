import React, { useEffect, useState, useRef, createRef } from 'react';
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
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [addType, setAddType] = useState("Expense");
  const [updating, setUpdating] = useState(false);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const categoryRef = useRef();
  const addRefs =  Array(months.length).fill().map((_, i) => createRef()) 


  // async dispatch to fetch data for every edit made
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getUserData(currentUser.uid));
    }
  }, [status, dispatch, currentUser]);



  // ----------- functions -----------------

  // initiate add expense/income row
  function handleAddRow (e) {

    e.preventDefault();

    setError('');
    setUpdating(true);
    if (!validateAddForm()) {
      return;
    }

    // merge with new data
    var oldData = {};
    if (addType === "Expense") {
      oldData = Object.assign(expenses);
    }
    else {
      oldData = Object.assign(income);
    }
    const newData = {
      ...oldData,
      [categoryRef.current.value]: addRefs.map(v => parseFloat(v.current.value || "0"))
    };
    fetch(`/add${addType}/${currentUser.uid}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(newData),
      headers: { 'Content-type': 'application/json' }
    })
    .then(res => {
      console.log(res);
      alert(`${addType} data successfully added.`);
      setAdding(false);
    })
    .catch(err => {
      setError(`${addType} data failed to add: ${err.message}`);
    })
    .finally(() => {
      setUpdating(false);
      dispatch(getUserData(currentUser.uid));
    })
  }

  // validate add form input
  function validateAddForm () {
    let category = categoryRef.current.value;
    if (!category) {
      setError("Category can't be blank");
      return false;
    }
    return true;
  }

  // open add form
  function openAddDialog (rowType) {
    setAdding(true);
    setError('');
    setAddType(rowType);
  }




  // ----------------- UI ----------------------------

  const monthLine = (
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
  var incomeHTML = [];
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
  for (const [key, value] of Object.entries(income)) {
    incomeHTML.push(
      <div className={styles.Row} key={incomeHTML.length}>
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
      <input type="text" id="category" name="category" ref={categoryRef} placeholder='Purpose ...'/><br/>
    </div>
  )
  for (let i=0; i<months.length; i++) {
    const currentRef = addRefs[i];
    addFormHTML.push(
      <div className={styles.AddField} key={i}>
        <label htmlFor={i}>{months[i]}:</label>
        <input type="number" step="0.01" id={i} name={i} ref={currentRef} defaultValue="0"/><br/>
      </div>
    );
  }


  return (
    <div className={styles.Ledger}>
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
                onClick={() => openAddDialog("Expense")}
              >
                Add category
              </button>
            </div>
          }
          {!adding &&
            <div className={styles.Income}>
              <div className={styles.Header}>Income</div>
              {monthLine}
              {incomeHTML.map(val => val)}
              <button
                className={styles.Button1}
                onClick={() => openAddDialog("Income")}
              >
                Add category
              </button>
            </div>
          }
          {adding &&
            <div className={styles.AddDialog}>
              <button
                className={`${styles.Button1} ${styles.CancelButton}`}
                disabled={updating}
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
              <div className={styles.AddHeader}>Add New {addType}</div>
              {error && <div className={`${cardStyles.Alert} ${styles.Alert}`}>{error}</div>}
              <form className={styles.Form} onSubmit={handleAddRow}>
                {addFormHTML.map(val => val)}
                <button
                  className={styles.Button1}
                  type="submit"
                  value="add"
                  disabled={updating}
                >
                  Done
                </button>
              </form>
            </div>
          }
        </div>
        :
        <Loader />
      }
    </div>
  )
}
