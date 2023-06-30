const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurant");
const restaurants = require("../controllers/restaurants");
const { isLoggedIn, validateRestaurant, isAuthor } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const router = express.Router();

router
  .route("/")
  .get(catchAsync(restaurants.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateRestaurant,
    catchAsync(restaurants.createRestaurant)
  );

router.get("/new", isLoggedIn, restaurants.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(restaurants.showRestaurant))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateRestaurant,
    catchAsync(restaurants.updateRestaurant)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(restaurants.deleteRestaurant));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(restaurants.renderEditForm)
);

module.exports = router;
