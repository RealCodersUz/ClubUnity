const Joi = require("joi");

exports.postOrderSchema = {
  body: Joi.object({
    room_id: Joi.string().required(),
    order_ids: Joi.string(),
    time: Joi.string().required(),
    type: Joi.string().valid("vip", "simple").required(),
    is_active: Joi.boolean(),
  }),
};

exports.patchOrderSchema = {
  params: Joi.object({
    id: Joi.number(),
  }),
  body: Joi.object({
    room_id: Joi.string(),
    order_ids: Joi.string(),
    time: Joi.string(),
    type: Joi.string().valid("vip", "simple"),
    is_active: Joi.boolean(),
  }),
};

exports.showOrderSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allOrderSchema = {
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

exports.deleteOrderSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
