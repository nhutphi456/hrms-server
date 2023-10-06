const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your frontend app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to send cookies or credentials with requests
};

app.use(cors(corsOptions));
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable the GraphQL web interface (optional)
  })
);
app.get('/employees', (req, res) => {
    res.json(employees);
  });
  
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});