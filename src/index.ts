// require('dotenv').config();

import { ApolloServer } from 'apollo-server';

import { jsSchema, typeDefs } from './schema';
import { resolvers } from './resolvers';

import AccountAPI from './datasources/account';

// const internalEngineDemo = require('./engine-demo');
// set up any dataSources our resolvers need
const dataSources = () => ({
  accountAPI: new AccountAPI(),
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: true,
  playground: true,
  // engine: {
  //   apiKey: process.env.ENGINE_API_KEY,
  //   ...internalEngineDemo,
  // },
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }: any) => {
      console.log(`🚀 app running at ${url}`)
    });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  AccountAPI,
  server,
};
