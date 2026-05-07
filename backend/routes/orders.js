const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/auth");

// PLACE ORDER
router.post(
  "/",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    const { shipping_address } =
      req.body;

    try {
      // GET USER CART
      const [cart] = await db.query(
        `
        SELECT *
        FROM carts
        WHERE user_id=?
        `,
        [req.user.id]
      );

      // CHECK CART EXISTS
      if (cart.length === 0) {
        return res.status(400).json({
          message: "Cart Empty",
        });
      }

      // GET CART ITEMS
      const [items] = await db.query(
        `
        SELECT *
        FROM cart_items
        WHERE cart_id=?
        `,
        [cart[0].id]
      );

      // CHECK ITEMS
      if (items.length === 0) {
        return res.status(400).json({
          message: "No Items In Cart",
        });
      }

      // CALCULATE TOTAL
      let total = 0;

      items.forEach((item) => {
        total +=
          item.price * item.quantity;
      });

      // CREATE ORDER NUMBER
      const orderNumber =
        "ORD-" + Date.now();

      // INSERT ORDER
      const [order] = await db.query(
        `
        INSERT INTO orders
        (
          user_id,
          order_number,
          total_amount,
          shipping_address
        )
        VALUES (?,?,?,?)
        `,
        [
          req.user.id,
          orderNumber,
          total,
          shipping_address,
        ]
      );

      // INSERT ORDER ITEMS
      for (let item of items) {
        // GET PRODUCT SELLER
        const [product] =
          await db.query(
            `
            SELECT seller_id
            FROM products
            WHERE id=?
            `,
            [item.product_id]
          );

        const sellerId =
          product[0].seller_id;

        await db.query(
          `
          INSERT INTO order_items
          (
            order_id,
            product_id,
            seller_id,
            quantity,
            price,
            subtotal
          )
          VALUES (?,?,?,?,?,?)
          `,
          [
            order.insertId,
            item.product_id,
            sellerId,
            item.quantity,
            item.price,
            item.price *
              item.quantity,
          ]
        );
      }

      // CLEAR CART
      await db.query(
        `
        DELETE FROM cart_items
        WHERE cart_id=?
        `,
        [cart[0].id]
      );

      res.json({
        message: "Order Placed",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Order Failed",
      });
    }
  }
);

// GET USER ORDERS
router.get(
  "/",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      const [orders] = await db.query(
        `
        SELECT *
        FROM orders
        WHERE user_id=?
        ORDER BY id DESC
        `,
        [req.user.id]
      );

      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: "Error",
      });
    }
  }
);
// SELLER RECEIVED ORDERS
router.get(
  "/seller",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      const [orders] = await db.query(
        `
        SELECT
        orders.id AS order_id,
        orders.order_number,
        orders.status,
        products.title,
        products.image_url,
        order_items.quantity,
        order_items.price,
        order_items.subtotal
        FROM order_items
        JOIN orders
        ON order_items.order_id = orders.id
        JOIN products
        ON order_items.product_id = products.id
        WHERE order_items.seller_id=?
        ORDER BY orders.id DESC
        `,
        [req.user.id]
      );

      res.json(orders);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Error Fetching Orders",
      });
    }
  }
);

// UPDATE ORDER STATUS
router.put(
  "/status/:orderId",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    const { status } = req.body;

    try {
      await db.query(
        `
        UPDATE orders
        SET status=?
        WHERE id=?
        `,
        [
          status,
          req.params.orderId,
        ]
      );

      res.json({
        message:
          "Status Updated",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Update Failed",
      });
    }
  }
);
module.exports = router;
