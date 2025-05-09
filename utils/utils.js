const { handleError } = require("../manager/error.manager.js");

function asyncWrapper(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      handleError(res, error);
    }
  };
}

module.exports = { asyncWrapper };
