import mongoose from "mongoose";
import Reviews from "./review.js";

const Schema = mongoose.Schema;

const upvotes = new Schema({
  reviewId: String,
  raterID: String,
});

upvotes.statics.addNewRating = async function (
  reviewId: string,
  raterID: string
) {
  await mongoose
    .model("Upvotes")
    .create({ reviewId: reviewId, raterID: raterID });

  let allUpvotes = await mongoose.model("Upvotes").find({ raterID: raterID });

  let allReviewsUpvoted: {}[] = [];

  for (let instance of allUpvotes) {
    allReviewsUpvoted.push(
      await Reviews.findOne({ _id: instance.reviewId }).exec()
    );
  }

  return allReviewsUpvoted;
};

export default mongoose.model("Upvotes", upvotes);
