import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from 'firebase/auth';


const AuthContext = React.createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPass,
    updateUserEmail,
    updateUserPassword
  }

  // look for user on mount or change of auth state
  useEffect ( () => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);




  /* talk to the firebase */

  async function signup (email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      fetch(`/addUser/${cred.user.uid}`, {
        method: 'POST',
        mode: 'cors'
      }).catch(err => {
        console.log(`Error feching '/addUser': ${err.message}`)
      });
    });
  }

  function login (email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout () {
    return signOut(auth);
  }

  function resetPass (email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail (email) {
    return updateEmail(currentUser, email);
  }

  function updateUserPassword (password) {
    return updatePassword(currentUser, password);
  }


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}