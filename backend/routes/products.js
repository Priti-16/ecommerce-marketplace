const express = require("express");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [products] = await db.query(
      `
      SELECT *
      FROM products
      WHERE status='active'
      `
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [product] = await db.query(
      `
      SELECT *
      FROM products
      WHERE id=?
      `,
      [req.params.id]
    );

    res.json(product[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});

module.exports = router;