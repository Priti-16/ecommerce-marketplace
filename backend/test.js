const mysql = require("mysql2/promise");

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3307,
      user: "root",
      password: "ROOT",
      database: "ecommerce",
    });

    console.log("CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log("FAILED");
    console.log(err);
  }
}

test();