const bcrypt = require("bcrypt");

async function run() {
  const password = process.argv[2];

  if (!password) {
    console.log("استفاده: node hashPassword.js <password>");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  console.log(hash);
}

run();
