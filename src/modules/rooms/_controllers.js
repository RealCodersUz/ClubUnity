const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postRoomSchema,
  patchRoomSchema,
  allRoomSchema,
  showRoomSchema,
  deleteRoomSchema,
} = require("./_schemas");
const addRoom = require("./addRoom");
const editRoomService = require("./editRoom");
const showRoom = require("./showRoom");
const removeRoom = require("./removeRoom");
const allRoom = require("./allRooms");
const { BadRequestError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postRoom = async (req, res, next) => {
  console.log("wetta");
  try {
    httpValidator({ body: req.body }, postRoomSchema);

    const result = await addRoom(req.body);

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

const editRoom = async (req, res, next) => {
  const { error } = patchRoomSchema.body.validate(req.body);

  if (error) {
    const details = error.details.map((err) => err.message).join(", ");
    return next(new BadRequestError(`Validation error: ${details}`));
  }

  try {
    const result = await editRoomService({
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

const getRoom = async (req, res, next) => {
  try {
    const result = await showRoom({ id: req.params.id });

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

const listRooms = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allRoomSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allRoom({ ...query, page: { limit, offset } });

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

const deleteRoom = async (req, res, next) => {
  try {
    const result = await removeRoom({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postRoom,
  editRoom,
  getRoom,
  deleteRoom,
  listRooms,
};
