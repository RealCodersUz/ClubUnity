const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postFoodSchema,
  patchFoodSchema,
  allFoodSchema,
  showFoodSchema,
  deleteFoodSchema,
} = require("./_schemas");
const addFood = require("./addFood");
const editFoodService = require("./editFood");
const showFood = require("./showFood");
const removeFood = require("./removeFood");
const allFood = require("./allFood");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postFood = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postFoodSchema);
    req.body.img = req.file?.filename;
    const result = await addFood(req.body);

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

const editFood = async (req, res, next) => {
  const { error } = patchFoodSchema.body.validate(req.body);

  if (error) {
    const details = error.details.map((err) => err.message).join(", ");
    return next(new BadRequestError(`Validation error: ${details}`));
  }

  try {
    const result = await editFoodService({
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

const getFood = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, showFoodSchema);

    const result = await showFood({ id: req.params.id });

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

const listFoods = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allFoodSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allFood({ ...query, page: { limit, offset } });

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

const deleteFood = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postFoodSchema);

    const result = await removeFood({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postFood,
  editFood,
  getFood,
  deleteFood,
  listFoods,
};
