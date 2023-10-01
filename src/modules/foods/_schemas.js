const Joi = require("joi");

exports.postFoodSchema = {
  body: Joi.object({
    uz_name: Joi.string().required(),
    ru_name: Joi.string().required(),
    price: Joi.number().required(),
    categories_id: Joi.string().required(),
    type: Joi.string().valid("good", "food").required(),
  }),
};

exports.patchFoodSchema = {
  params: Joi.object({
    id: Joi.number(),
  }),
  body: Joi.object({
    uz_name: Joi.string(),
    ru_name: Joi.string(),
    price: Joi.number(),
    categories_id: Joi.string(),
    type: Joi.boolean(),
  }),
};

exports.showFoodSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allFoodSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("price", "_id"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(10),
    }),
    filters: {
      is_super: Joi.boolean(),
    },
  }),
};

exports.deleteFoodSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
