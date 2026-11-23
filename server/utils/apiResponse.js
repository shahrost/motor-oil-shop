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

module.exports = { success, created };
