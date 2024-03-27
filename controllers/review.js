const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.reviewPost = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.reviews);

  listing.reviews.push(newReview);
  newReview.author = req.user._id;
  await newReview.save();
  await listing.save();

  console.log("Review added!");
  req.flash("success", "New review added!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.reviewDestroy = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  console.log("Review Deleted!");
  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
