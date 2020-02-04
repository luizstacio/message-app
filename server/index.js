const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/messages', require('./modules/messages/routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server up and running at port', port);
});