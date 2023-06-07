const express = require('express');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');

const {
  handleGetAllContacts,
  handleGetByIdContact,
  handleCreateContact,
  handleEditContact,
  handleDeleteContact,
} = require('./controller');

const app = express();
const port = 8080;
const date = Date();

app.use(express.json());
app.use(bodyParser.json());
morganBody(app);

app.get('/api/contacts', handleGetAllContacts);

app.get('/api/contacts/:id', handleGetByIdContact);

app.post('/api/contacts', handleCreateContact);

app.patch('/api/contacts/:id', handleEditContact);

app.delete('/api/contacts/:id', handleDeleteContact);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}!`)
);