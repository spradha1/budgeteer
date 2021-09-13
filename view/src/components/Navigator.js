import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navigator.module.css';


export default function Navigator() {

  const { logout } = useAuth();
  const history = useHistory();


  // handle log out click
  async function handleLogout (selectedKey) {
    try {
      await logout();
      history.push('/login');
    } catch (err) {
      alert(`Log out failed: ${err.message}`);
    }
  }
 

  return (
    <div className={styles.Navbar}>
      <div className={styles.Brand}><NavLink className={styles.InactiveLink} exact to='/'>Budgeteer</NavLink></div>
      <div className={styles.NavOptions}>
        <NavLink className={styles.InactiveLink} to='/'>Dashboard</NavLink>
        <div className={styles.InactiveLink} onClick={handleLogout} >Log Out</div>
      </div>
    </div>
  )
}