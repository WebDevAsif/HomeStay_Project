const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
    }).optional(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    goemetry: Joi.object({
      type: Joi.string(),
      coordinates: Joi.string(),
    }).required(),
    category: Joi.string(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  reviews: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    createdAt: Joi.date(),
  }).required(),
});
