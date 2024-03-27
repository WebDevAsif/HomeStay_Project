const Listing = require("../models/listing");
const mapToken = process.env.MAP_TOKEN;
const mbxGeocode = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocode({ accessToken: mapToken });

module.exports.indexRenderRoute = async (req, res) => {
  const allListings = await Listing.find();

  res.render("listings/index.ejs", { allListings, title: "HomeStay" });
};

module.exports.newFormRenderRoute = (req, res) => {
  res.render("listings/new.ejs", { title: "New Listing" });
};

module.exports.showListingRoute = async (req, res) => {
  let { id } = req.params;
  const listings = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Listing not found!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listings, title: listings.title });
};

module.exports.createListingRoute = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New listing added!");
  res.redirect("/listings");
};

module.exports.editFormRenderRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  let listingImage = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, listingImage, title: "Edit Listing" });
};

module.exports.updateListingRoute = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`); // Use the updated listing's ID
};

module.exports.destroyListingRoute = async (req, res) => {
  let { id } = req.params;
  const delListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
