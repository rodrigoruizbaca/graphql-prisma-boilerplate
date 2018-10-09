import Query from './Query';
import Mutation from './Mutation';
import User from './User';
import Subscription from './Subscription';
import { extractFragmentReplacements } from 'prisma-binding';

const resolvers = {
  Query, 
    Mutation, 
    User, 
    Subscription
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export {resolvers, fragmentReplacements};