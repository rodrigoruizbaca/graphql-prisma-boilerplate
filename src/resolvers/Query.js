const Query = {
  users: (parent, args, {db, prisma}, info) => {
    const prismaArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      prismaArgs.where = {
        OR: [{
          name_contains: args.query
        },{
          email_contains: args.query
        }]
      };
    }

    return prisma.query.users(prismaArgs, info);
  },
};

export {Query as default};