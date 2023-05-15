import mongoose from "mongoose";
import { server } from "./index.js";
import { startStandaloneServer } from "@apollo/server/standalone";

mongoose.connection.once("open", async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4500 },

    context: async ({ req, res }) => {
      const user = req.headers.authorization || " ";
      return { user };
    },
  });

  console.log(`Server ready at: ${url}`);
});
