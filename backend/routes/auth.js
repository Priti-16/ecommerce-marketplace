const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  const db = req.app.locals.db;

  const { name, email, password, role } = req.body;

  try {
    await db.query(
      "INSERT INTO users(name,email,password,role,status,verified) VALUES(?,?,?,?,?,?)",
      [
        name,
        email,
        password,
        role,
        role === "seller"
          ? "pending"
          : "active",
        true,
      ]
    );

    res.json({
      message:
        "Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Registration Failed",
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const db = req.app.locals.db;

  const { email, password } =
    req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }

    const user = users[0];

    // SIMPLE PASSWORD CHECK
    if (password !== user.password) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
    status: user.status,
  },
  "SECRET_KEY",
  {
    expiresIn: "7d",
  }
);

    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login Failed",
    });
  }
});

module.exports = router;