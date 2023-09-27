const Joi = require("joi");

exports.postRegisterUserSchema = {
  body: Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    is_super: Joi.boolean(),
  }),
};

exports.postLoginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    full_name: Joi.string(),
    email: Joi.string(),
    phone_number: Joi.string(),
    username: Joi.string(),
  }),
};

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allUserSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("age"),
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

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),

  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    age: Joi.number(),
    role: Joi.string(),
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
