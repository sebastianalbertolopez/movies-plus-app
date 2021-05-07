const common = require('./common');
const ErrorHandler = require('./errorHandler');

const sendOK = (res, body) => {
  if (!common.isObject(body)) {
    throw new ErrorHandler('Response content must be an object.', 500);
  }

  res.status(200).send({
    status: 'success',
    body
  });
};

module.exports = { sendOK };
