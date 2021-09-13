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