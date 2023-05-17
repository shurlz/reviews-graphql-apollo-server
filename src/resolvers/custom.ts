import User from "../models/users.js";

export const customResolvers = {

  // union resolver
  
  Results: {
    __resolveType(obj, _, __) {
      if (obj.email) return "User";
      if (obj.review) return "Rating";
      if (!obj) return null;
    },
  },


  // chained resolver

  Rating: {
    createdBy (parent) {
      return User.findOne({ _id: parent.createdBy }).exec();
    }
  },
};
