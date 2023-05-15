import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviews = new Schema({
  country: String,
  state: String,
  adderss: String,
  review: String,
  createdBy: String,
});

reviews.statics.createReview = async function (
  country: string,
  state: string,
  adderss: string,
  review: string,
  createdBy: string
) {
  return await mongoose.model("Reviews").create({
    country,
    state,
    adderss,
    review,
    createdBy,
  });
};

reviews.methods.updateReview = async function (
  country: string,
  state: string,
  adderss: string,
  review: string
) {
  this.country = country;
  this.state = state;
  this.adderss = adderss;
  this.review = review;
  await this.save();

  return this;
};

export default mongoose.model("Reviews", reviews);
