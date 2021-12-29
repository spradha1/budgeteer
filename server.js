const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// cors policy
app.use(cors({
  origin: "*",
}));
// parse JSON bodies
app.use(express.json());
// port
const port = process.env.PORT || 5000;

// firebase app
const firebase_admin = require('firebase-admin');
firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(require(process.env.APP_CREDENTIALS))
});
const db = firebase_admin.firestore();

// Server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));


// add user to database
app.post('/addUser/:uid', async (req, res, next) => {
  db.collection('users').doc(req.params.uid).set({
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

// add new expense field to database
app.put('/addExpense/:uid', async(req, res, next) => {
  db.collection('users').doc(req.params.uid).set({
    expenses: req.body
  },{ merge: true })
  .then(() => {
    res.status(200).send("New expense successfully added.");
  })
  .catch(err => {
    console.log("Error adding expense to database: " + err.message);
    next(err);
  });
});

// add new expense field to database
app.put('/addIncome/:uid', async(req, res, next) => {
  db.collection('users').doc(req.params.uid).set({
    income: req.body
  },{ merge: true })
  .then(() => {
    res.status(200).send("New income successfully added.");
  })
  .catch(err => {
    console.log("Error adding income to database: " + err.message);
    next(err);
  });
});
