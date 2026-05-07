const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/auth");

// GET SELLER PRODUCTS
router.get(
  "/products",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      const [products] = await db.query(
        `
        SELECT *
        FROM products
        WHERE seller_id=?
        `,
        [req.user.id]
      );

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: "Error",
      });
    }
  }
);

// ADD PRODUCT
router.post(
  "/products",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;
    const [users] = await db.query(
      `
      SELECT status
      FROM users
      WHERE id=?
      `,
      [req.user.id]
    );

    if (
      users[0].status !== "approved"
    ) {
      return res.status(403).json({
        message:
          "Seller Not Approved By Admin",
      });
    }
    const {
      title,
      description,
      price,
      stock_quantity,
      category,
      image_url,
    } = req.body;

    try {
      await db.query(
        `
        INSERT INTO products
        (
          seller_id,
          title,
          description,
          price,
          stock_quantity,
          category,
          image_url,
          status
        )
        VALUES (?,?,?,?,?,?,?,?)
        `,
        [
          req.user.id,
          title,
          description,
          price,
          stock_quantity,
          category,
          image_url,
          "active",
        ]
      );

      res.json({
        message: "Product Added",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed",
      });
    }
  }
);

// UPDATE PRODUCT
router.put(
  "/products/:id",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    const {
      title,
      description,
      price,
      stock_quantity,
      category,
      image_url,
    } = req.body;

    try {
      await db.query(
        `
        UPDATE products
        SET
        title=?,
        description=?,
        price=?,
        stock_quantity=?,
        category=?,
        image_url=?
        WHERE id=? AND seller_id=?
        `,
        [
          title,
          description,
          price,
          stock_quantity,
          category,
          image_url,
          req.params.id,
          req.user.id,
        ]
      );

      res.json({
        message: "Updated",
      });
    } catch (error) {
      res.status(500).json({
        message: "Update Failed",
      });
    }
  }
);

// DELETE PRODUCT
router.delete(
  "/products/:id",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      await db.query(
        `
        DELETE FROM products
        WHERE id=? AND seller_id=?
        `,
        [req.params.id, req.user.id]
      );

      res.json({
        message: "Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Delete Failed",
      });
    }
  }
);

module.exports = router;