export const customResolvers = {
  Results: {
    __resolveType(obj, _, __) {
      if (obj.email) return "User";
      if (obj.review) return "Rating";
      if (!obj) return null;
    },
  },
};
