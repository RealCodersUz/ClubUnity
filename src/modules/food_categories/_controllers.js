const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postCategorySchema,
  patchCategorySchema,
  allCategorySchema,
  showCategorySchema,
  deleteCategorySchema,
} = require("./_schemas");
const addCategory = require("./addCategory");
const editCategoryService = require("./editCategory");
const showCategory = require("./showCategory");
const removeCategory = require("./removeCategory");
const allCategory = require("./allCategory");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postCategory = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postCategorySchema);

    const result = await addCategory(req.body);

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

const editCategory = async (req, res, next) => {
  const { error } = patchCategorySchema.body.validate(req.body);

  if (error) {
    const details = error.details.map((err) => err.message).join(", ");
    return next(new BadRequestError(`Validation error: ${details}`));
  }

  try {
    const result = await editCategoryService({
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

const getCategory = async (req, res, next) => {
  try {
    const result = await showCategory({ id: req.params.id });

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

const listCategorys = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allCategorySchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allCategory({ ...query, page: { limit, offset } });

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

const deleteCategory = async (req, res, next) => {
  try {
    const result = await removeCategory({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postCategory,
  editCategory,
  getCategory,
  deleteCategory,
  listCategorys,
};
