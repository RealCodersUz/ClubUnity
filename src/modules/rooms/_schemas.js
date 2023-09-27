const Joi = require("joi");

exports.postRoomSchema = {
  body: Joi.object({
    type_name: Joi.string().required(),
    room_number: Joi.number().required(),
    price: Joi.number().required(),
    room_active: Joi.boolean(),
  }),
};

exports.patchRoomSchema = {
  params: Joi.object({
    id: Joi.number(),
  }),
  body: Joi.object({
    type_name: Joi.string(),
    room_number: Joi.number(),
    price: Joi.number(),
    room_active: Joi.boolean(),
  }),
};

exports.showRoomSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allRoomSchema = {
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

exports.deleteRoomSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
