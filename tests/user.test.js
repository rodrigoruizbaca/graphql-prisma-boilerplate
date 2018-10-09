import 'cross-fetch/polyfill'
import ApolloBoost, {gql} from 'apollo-boost';
import prisma from '../src/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getClient from './getClient';


const login = gql `
    mutation($email: String!, $password: String!) {
      login (
        email: $email,
        password: $password
      ) {token}
    }
   `;

const createUser = gql `
    mutation($user: UserInput!) {
      createUser(
        user: $user
      ) {
        token, user {id}
      }
    }
  `;

const createUserSubs = gql `
    subscription {
      user {
        mutation
      }
    }
`;

let token = undefined;  

beforeEach(async () => {
  await prisma.mutation.deleteManyUsers();
  const password = await bcrypt.hash("rruiz67", 10);
  const user = await prisma.mutation.createUser({
    data: {
      email: "admin@test.com",
      name: "admin",
      password
    }
  });
  token = jwt.sign(user, "thisisasecret");
});

test ('should login failed', async () => {
      
   await expect(
    getClient().mutate({
       mutation: login,
       variables: {
         "email": "123",
         password: "123"
       }
     })
   ).rejects.toThrow();
});

test('should create a new user', async () => {
  
  const response = await getClient(token).mutate({
    mutation: createUser,
    variables: {
      "user": {
        "name": "Rodrigo",
        "email": "rodrigo@test.com",
        "password": "rruiz67"
      }
    }
  });

  const exists = await prisma.exists.User({id: response.data.createUser.user.id});

  expect(exists).toBe(true);

});

test ('should subscribe to add a user', async (done) => {

  getClient(token).subscribe({
    query: createUserSubs
  }).subscribe({
    next(response) {
      expect(response.data.user.mutation).toBe('CREATED');
      done()
    }
  }); 

  const response = await getClient(token).mutate({
    mutation: createUser,
    variables: {
      "user": {
        "name": "Rodrigo",
        "email": "rodrigo@test.com",
        "password": "rruiz67"
      }
    }
  });

});