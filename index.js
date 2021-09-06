const express = require('express');
// const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// cors policy
app.use(cors({
  origin: "*",
}));

// Server running and listening to port
app.listen(port, () => console.log(`Listening on port ${port}`));


// get all user data
app.get('/', async (req, res) => {
  try {
    res.send({response: 'here it is'});
  }
  catch (e) {
    console.log("Error fetching data for user: " + e.message);
  };
});