const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const Post = require('./models/Post');
const dbConnection = require('./db');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = Post.find();
        return posts;
      } catch (error) {
        console.log(error.message);
        throw new Error(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

dbConnection();

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
