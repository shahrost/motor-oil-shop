function validateLogin(data) {
  const errors = [];

  if (!data.username) {
    errors.push("نام کاربری الزامی است");
  }

  if (!data.password) {
    errors.push("رمز عبور الزامی است");
  }

  return {
    valid: errors.length === 0,

    errors,
  };
}

module.exports = validateLogin;
