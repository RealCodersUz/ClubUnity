const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postOrderSchema,
  patchOrderSchema,
  allOrderSchema,
  showOrderSchema,
  deleteOrderSchema,
} = require("./_schemas");
const addOrder = require("./addOrder");
const editOrderService = require("./editOrder");
const showOrder = require("./showOrder");
const removeOrder = require("./removeOrder");
const allOrder = require("./allOrder");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postOrder = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postOrderSchema);
    req.body.img = req.file?.filename;
    const result = await addOrder(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const editOrder = async (req, res, next) => {
  const { error } = patchOrderSchema.body.validate(req.body);

  if (error) {
    const details = error.details.map((err) => err.message).join(", ");
    return next(new BadRequestError(`Validation error: ${details}`));
  }

  try {
    const result = await editOrderService({
      id: req.params.id || req.user.id,
      ...req.body,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getOrder = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showOrderSchema);

    const result = await showOrder({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const listOrders = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allOrderSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allOrder({ ...query, page: { limit, offset } });

    res.status(200).json({
      data: result.data,
      pageInfo: result.pageInfo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const deleteOrder = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteOrderSchema);

    const result = await removeOrder({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postOrder,
  editOrder,
  getOrder,
  deleteOrder,
  listOrders,
};
