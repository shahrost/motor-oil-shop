function success(res, data, message = "موفق") {
  return res.status(200).json({
    success: true,

    message,

    data,
  });
}

function created(res, data, message = "ایجاد شد") {
  return res.status(201).json({
    success: true,

    message,

    data,
  });
}

function error(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,

    message,
  });
}

module.exports = {
  success,

  created,

  error,
};
