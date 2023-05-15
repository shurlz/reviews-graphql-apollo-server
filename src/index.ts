import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { connectToDatabase } from "./utils/database.js";
import { ratingsDefs } from "./schemas/ratings.js";
import { authorizeDefs } from "./schemas/authorize.js";
import { usersDefs } from "./schemas/users.js";
import { searchDefs } from "./schemas/search.js";
import { queries } from "./resolvers/querys.js";
import { mutations } from "./resolvers/mutations.js";
import { customResolvers } from "./resolvers/custom.js";

const typeDefs = usersDefs + authorizeDefs + ratingsDefs + searchDefs;

const resolvers = { ...queries, ...mutations, ...customResolvers };

connectToDatabase();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
