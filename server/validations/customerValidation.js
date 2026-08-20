function validateRegister(data) {
  const errors = [];

  if (!data.name) {
    errors.push("نام الزامی است");
  }

  if (!data.phone) {
    errors.push("شماره موبایل الزامی است");
  } else if (!/^09\d{9}$/.test(data.phone)) {
    errors.push("شماره موبایل معتبر نیست");
  }

  if (!data.password) {
    errors.push("رمز عبور الزامی است");
  } else if (data.password.length < 6) {
    errors.push("رمز عبور باید حداقل ۶ کاراکتر باشد");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateLogin(data) {
  const errors = [];

  if (!data.phone) {
    errors.push("شماره موبایل الزامی است");
  }

  if (!data.password) {
    errors.push("رمز عبور الزامی است");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateRegister,
  validateLogin,
};
