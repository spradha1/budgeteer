const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

// cors policy
app.use(cors({
  origin: "*",
}));

// firebase app
const dotenv = require('dotenv');
dotenv.config();
const firebase_admin = require('firebase-admin');
firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(require(process.env.APP_CREDENTIALS))
});
const db = firebase_admin.firestore();

// Server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));


// add user to database
app.post('/addUser/:uid', async (req, res, next) => {
  return db.collection('users').doc(req.params.uid).set({
    expenses: {},
    income: {}
  }).catch(err => {
    console.log("Error adding user to database: " + err.message);
    next(err);
  });
});

// get data of a particular user from the database
app.get('/getUserData/:uid', async (req, res, next) => {
  const docRef = db.collection('users').doc(req.params.uid);
  await docRef.get()
  .then((doc) => {
    if (doc.exists) {
      res.send({ data: doc.data() });
    } else {
      throw new Error('No data exists for current user.');
    }
  })
  .catch(err => {
    console.log("Error fetching user data: " + err.message);
    next(err);
  });
});