const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, {currentUserId}, info) {
      return currentUserId === parent.id ? parent.email : null;
    }
  }

};

export {User as default};