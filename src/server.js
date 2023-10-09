const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const newSchema = require('./newSchema');

const app = express();
const corsOptions = {
  origin: ['http://localhost:4200', 'https://hrms-tan.vercel.app'], // Replace with your frontend app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to send cookies or credentials with requests
};

app.use(cors(corsOptions));
app.use(
  '/graphql',
  graphqlHTTP({
    schema: newSchema,
    // schema,
    graphiql: true, // Enable the GraphQL web interface (optional)
  })
);
app.get('/employees', (req, res) => {
    res.json(employees);
  });
  
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});