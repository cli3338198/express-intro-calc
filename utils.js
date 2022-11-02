const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  const nums = [];

  for (const num of strNums.split(",")) {
    const convertedNum = Number(num);
    if (Number.isNaN(convertedNum)) {
      throw new BadRequestError(`${num} is not a number!`);
    } else {
      nums.push(convertedNum);
    }
  }

  return nums;

  // try {
  //   return strNums.map(Number);
  // } catch (err) {
  //   throw new BadRequestError("some entries are not numbers!");
  // }
}

/**
 * findMode: find the mode
 * - create a freq map of numbers
 * - return most common
 */
function findMode(nums) {
  const freq = {};

  for (const num of nums) {
    freq[num] = freq[num] + 1 || 1;
  }

  let max = 0;
  let result = [];

  for (const key in freq) {
    if (freq[key] > max) {
      max = freq[key];
      result = [key];
    } else if (freq[key] === max) {
      result.push(key);
    }
  }

  return result;
}

module.exports = { convertStrNums, findMode };
