"use strict";
/** Simple demo Express app. */

const express = require("express");
const app = express();

const { findMode, convertStrNums } = require("./utils");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  let nums = req.query.nums;
  if (!nums || nums.length === 0) {
    throw new BadRequestError("must provide nums");
  }
  nums = convertStrNums(nums);

  const mean = Math.floor(
    nums.reduce((acc, num) => acc + num, 0) / nums.length
  );

  return res.json({
    operation: "mean",
    value: mean,
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  let nums = req.query.nums;
  if (!nums || nums.length === 0) {
    throw new BadRequestError("must provide nums");
  }
  nums = convertStrNums(nums);

  nums.sort((a, b) => a - b);
  const middle = Math.floor(nums.length / 2);
  const median = nums[middle];

  return res.json({
    operation: "median",
    value: median,
  });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  let nums = req.query.nums;
  if (!nums || nums.length === 0) {
    throw new BadRequestError("must provide nums");
  }
  nums = convertStrNums(nums);

  const mostFrequentNum = findMode(nums);

  return res.json({
    operation: "mode",
    value: mostFrequentNum,
  });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

/**
 * check every route for valid nums
 */
// app.use(function (err, req, res, next) {
//   let nums = req.query.nums;
//   if (nums && nums.length > 0) {
//     next();
//   } else {
//     throw new BadRequestError("nums must be provided");
//   }
// });

module.exports = app;
