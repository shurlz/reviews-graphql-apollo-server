// @ts-nocheck
import { customError } from "../utils/customErrors.js";
import User from "../models/users.js";
import Reviews from "../models/review.js";
import Upvotes from "../models/upvotes.js";

export const mutations = {
  Mutation: {
    authorize: async (_, { data }, __) => {
      const { password, email } = data;

      let token: string, message: string;
      const user = await User.findOne({ email: email }).exec();

      // if user with this email doesn't exist, then create an account
      if (!user) {
        token = await User.createNewUser(email, password);
        message = "Sign up successful";
        return { message, token, email: email };
      }

      // email user exists, validate credentials
      token = await user.signInUser(password);
      message = token ? `Sign In successful` : `In-valid login credentials`;

      return { message, token, email: email };
    },

    createRating: async (_, { data }, { user }) => {
      const userId = await User.decryptToken(user);
      if (!userId)
        return customError(401, "User not authenticated", "UNAUTHENTICATED");

      const { country, state, adderss, review } = data;
      const newRating = await Reviews.createReview(
        country,
        state,
        adderss,
        review,
        userId
      );

      return newRating.toObject();
    },

    updateRating: async (_, { id, data }, { user }) => {
      const userId = await User.decryptToken(user);
      if (!userId)
        return customError(401, "User not authenticated", "UNAUTHENTICATED");

      const rating = await Reviews.findOne({
        _id: id,
        createdBy: userId,
      }).exec();

      if (!rating) return null;

      const { country, state, adderss, review } = data;
      rating.updateReview(country, state, adderss, review);

      return rating.toObject();
    },

    deleteRating: async (_, { data }, { user }) => {
      const userId = await User.decryptToken(user);
      if (!userId)
        return customError(401, "User not authenticated", "UNAUTHENTICATED");

      if (await Reviews.findOneAndDelete({ id: data.id, createdBy: userId }))
        return "Deletion successful";

      return "Deletion un-successful";
    },

    upvote: async (_, { reviewId }, { user }) => {
      const userId = await User.decryptToken(user);
      if (!userId)
        return customError(401, "User not authenticated", "UNAUTHENTICATED");

      const newUpvote = await Upvotes.addNewRating(reviewId, userId);

      return newUpvote;
    },
  },
};
