const Joi = require("joi");

exports.postCategorySchema = {
  body: Joi.object({
    uz_name: Joi.string().required(),
    ru_name: Joi.string().required(),
    type: Joi.string().valid("good", "food").required(),
    price: Joi.number().required(),
  }),
};

exports.patchCategorySchema = {
  params: Joi.object({
    id: Joi.number(),
  }),
  body: Joi.object({
    uz_name: Joi.string().required(),
    ru_name: Joi.string().required(),
    type: Joi.boolean().required(),
    price: Joi.number().required(),
  }),
};

exports.showCategorySchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allCategorySchema = {
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

exports.deleteCategorySchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
