const { ApolloServer } = require('apollo-server');
const dbConnection = require('./db');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

dbConnection();

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
