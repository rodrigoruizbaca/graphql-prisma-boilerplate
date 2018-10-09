import {GraphQLServer, PubSub} from 'graphql-yoga';
import prisma from './prisma';
import directiveResolvers from './resolvers/DirectiveResolvers';
import { resolvers, fragmentReplacements} from './resolvers';
 
const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  directiveResolvers,
  resolvers,
  fragmentReplacements,
  context (request) {
    return {
      pubSub, prisma, request
    };
  }
});

export {server as default};