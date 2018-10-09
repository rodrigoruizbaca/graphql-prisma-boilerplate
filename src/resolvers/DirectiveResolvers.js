import jwt from 'jsonwebtoken';

const directiveResolvers = {
  isAuthenticated: async (next, source, args, context) => {        
    try {      
      const user = await auth(context.request.request.headers["authorization"]);
      context.currentUserId = user.id;
      return next();
    } catch (e) {
      throw e;
    }         
  },
  isSubsAuthenticated: async (next, source, args, context) => {            
    try {      
      console.log(context.request.connection.context.Authorization);
      const user = await auth(context.request.connection.context.Authorization);
      context.currentUserId = user.id;
      return next();
    } catch (e) {
      throw e;
    }    
  }    
};

const auth = async (accessToken) => {
  try {  
    if (!accessToken) {
      throw new Error('Invalid token');
    } 
    const token = accessToken.substring(7, accessToken.length);
    const decoded = await jwt.verify(token, "thisisasecret");      
    return decoded;
  } catch (e) {
    throw e;
  } 
}

export {directiveResolvers as default};