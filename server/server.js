const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// import Apollo Server
const { ApolloSever } = require('apollo-server-express');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require ('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// create a new Apollo server and pass in our schema data
const server = new ApolloSever({
    typeDefs,
    resolvers,
    context: authMiddleware
});

// integrate our Apollo Server with the Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.end.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
    app.listem(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});