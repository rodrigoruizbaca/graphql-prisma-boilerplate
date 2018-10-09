import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const Mutation = {
  login: async (parent, args, {prisma}, info) => {
    const found = await prisma.query.user({
      where: {
        email: args.email
      }
    });

    if (!found) {
      throw new Error('User or password not found!'); 
    }

    const match = await bcrypt.compare(args.password, found.password);

    if (!match) {
      throw new Error('User or password not found!'); 
    }

    return {user: found, token: jwt.sign(found, "thisisasecret")};
  },
  createUser: async (parent, args, {db, prisma, currentUserId}, info) => {    
    
    const band = await prisma.exists.User({email: args.user.email});
    if (!band) {
      const password = await bcrypt.hash(args.user.password, 10);
      const user = await prisma.mutation.createUser(
        {
          data: {
            email: args.user.email,
            name: args.user.name,
            password
          }
        });
      return {user, token: jwt.sign(user, "thisisasecret")};  
    } else {
      throw new Error('Email already exists');
    }
  }
};

export {Mutation as default};
