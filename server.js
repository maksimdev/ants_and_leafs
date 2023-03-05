const express = require('express');
const app = express();

// serve the static files from the public directory
app.use(express.static('public'));

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});