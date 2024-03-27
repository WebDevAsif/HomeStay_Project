const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewOwner } = require("../middleware.js");
const allReviewController = require("../controllers/review.js");

//Reviews Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(allReviewController.reviewPost));

//Review Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(allReviewController.reviewDestroy)
);

module.exports = router;
