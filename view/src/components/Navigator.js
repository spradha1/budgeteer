import React, { useRef } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navigator.module.css';


export default function Navigator() {

  const { logout } = useAuth();
  const history = useHistory();
  const navOptionsRef = useRef();
  const burgerRef = useRef();


  // handle log out click
  async function handleLogout () {
    try {
      await logout();
      history.push('/login');
    } catch (err) {
      alert(`Log out failed: ${err.message}`);
    }
  }

  // toggle burger menu
  function toggleBurger () {
    navOptionsRef.current.classList.toggle(`${styles.openMenu}`);
    burgerRef.current.classList.toggle(`${styles.openBurger}`);
  }
 

  return (
    <div className={styles.Navbar}>
      <div className={styles.Brand}><NavLink className={styles.BrandLink} exact to='/'>Budgeteer</NavLink></div>
      <div className={styles.Burger} ref={burgerRef} onClick={() => toggleBurger()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.NavOptions} ref={navOptionsRef}>
        <NavLink className={styles.NavOption} activeClassName={styles.currentPage} exact to='/'>Dashboard</NavLink>
        <NavLink className={styles.NavOption} activeClassName={styles.currentPage} to='/Profile'>Profile</NavLink>
        <div className={styles.NavOption} onClick={handleLogout} >Log Out</div>
      </div>
    </div>
  )
}