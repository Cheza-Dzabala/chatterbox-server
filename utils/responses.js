const _responseUtility = (statusCode, data, message) => {
  return {
    statusCode: statusCode,
    data: {
      data: data,
      message: message,
    },
  };
};

module.exports = {
  responseUtility: _responseUtility,
};
