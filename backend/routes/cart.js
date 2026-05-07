const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/auth");

// GET CART
router.get(
  "/",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      const [items] = await db.query(
        `
        SELECT cart_items.*,
        products.title,
        products.image_url
        FROM cart_items
        JOIN carts
        ON cart_items.cart_id=carts.id
        JOIN products
        ON cart_items.product_id=products.id
        WHERE carts.user_id=?
        `,
        [req.user.id]
      );

      res.json(items);
    } catch (error) {
      res.status(500).json({
        message: "Error",
      });
    }
  }
);

// ADD TO CART
router.post(
  "/add",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    const { productId, quantity } =
      req.body;

    try {
      let [cart] = await db.query(
        `
        SELECT *
        FROM carts
        WHERE user_id=?
        `,
        [req.user.id]
      );

      let cartId;

      if (cart.length === 0) {
        const [newCart] = await db.query(
          `
          INSERT INTO carts(user_id)
          VALUES(?)
          `,
          [req.user.id]
        );

        cartId = newCart.insertId;
      } else {
        cartId = cart[0].id;
      }

      const [product] = await db.query(
        `
        SELECT *
        FROM products
        WHERE id=?
        `,
        [productId]
      );

      await db.query(
        `
        INSERT INTO cart_items
        (
          cart_id,
          product_id,
          quantity,
          price
        )
        VALUES (?,?,?,?)
        `,
        [
          cartId,
          productId,
          quantity,
          product[0].price,
        ]
      );

      res.json({
        message: "Added To Cart",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed",
      });
    }
  }
);

// REMOVE CART ITEM
router.delete(
  "/:id",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      await db.query(
        `
        DELETE FROM cart_items
        WHERE id=?
        `,
        [req.params.id]
      );

      res.json({
        message: "Removed",
      });
    } catch (error) {
      res.status(500).json({
        message: "Delete Failed",
      });
    }
  }
);

module.exports = router;