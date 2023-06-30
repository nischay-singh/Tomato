const express = require("express");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Restaurant = require("../models/restaurant");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
