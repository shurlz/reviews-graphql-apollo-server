import User from "../models/users.js";
import Reviews from "../models/review.js";

export const queries = {
  Query: {
    getRating: async (_, { id }, __) => {
      const rating = await Reviews.findOne({ _id: id }).exec();

      return rating;
    },

    getRatings: async () => {
      let reviews = await Reviews.find({});

      reviews.map((review) => review.toObject());

      return reviews;
    },

    search: async (_, { text }, __) => {
      const reviewsSearch = await Reviews.find({
        $or: [
          { country: { $regex: `${text}`, $options: "i" } },
          { state: { $regex: `${text}`, $options: "i" } },
          { adderss: { $regex: `${text}`, $options: "i" } },
          { review: { $regex: `${text}`, $options: "i" } },
        ],
      });

      const usersSearch = await User.find({
        email: { $regex: `${text}`, $options: "i" },
      });

      const allResponses: {}[] = [...reviewsSearch, ...usersSearch];

      return allResponses;
    },
  },
};
