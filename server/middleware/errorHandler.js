function errorHandler(err, req, res, next) {

  console.log("ERROR:", err.message);


  const statusCode = err.statusCode || 500;


  res.status(statusCode).json({

    success: false,

    message: err.message || "خطای داخلی سرور",

  });

}


module.exports = errorHandler;