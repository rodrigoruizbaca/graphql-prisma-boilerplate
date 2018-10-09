const Subscription = {  
  user: {
    subscribe(parent, args, {prisma}, info) {
      return prisma.subscription.user(null, info);
    }
  }
};

export {Subscription as default};