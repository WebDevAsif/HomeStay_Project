const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const allListingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//New Route
router.get("/new", isLoggedIn, allListingController.newFormRenderRoute);

//Filter Route
router.get("/filter/:id", wrapAsync(allListingController.filter));

router.get("/search?:q", wrapAsync(allListingController.search));

router
  .route("/:id")
  .get(wrapAsync(allListingController.showListingRoute))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(allListingController.updateListingRoute)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(allListingController.destroyListingRoute));

router
  .route("/")
  .get(wrapAsync(allListingController.indexRenderRoute))
  .post(
    isLoggedIn,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(allListingController.createListingRoute)
  );

//Edit Route
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(allListingController.editFormRenderRoute));

module.exports = router;
