const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/auth");

// GET ALL SELLERS
router.get(
  "/sellers",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      const [sellers] = await db.query(
        `
        SELECT *
        FROM users
        WHERE role='seller'
        `
      );

      res.json(sellers);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching sellers",
      });
    }
  }
);

// APPROVE SELLER
router.put(
  "/sellers/:id/approve",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      await db.query(
        `
        UPDATE users
        SET status='approved'
        WHERE id=?
        `,
        [req.params.id]
      );

      res.json({
        message: "Seller Approved",
      });
    } catch (error) {
      res.status(500).json({
        message: "Approval Failed",
      });
    }
  }
);

// REJECT SELLER
router.put(
  "/sellers/:id/reject",
  authenticateToken,
  async (req, res) => {
    const db = req.app.locals.db;

    try {
      await db.query(
        `
        UPDATE users
        SET status='rejected'
        WHERE id=?
        `,
        [req.params.id]
      );

      res.json({
        message: "Seller Rejected",
      });
    } catch (error) {
      res.status(500).json({
        message: "Reject Failed",
      });
    }
  }
);

module.exports = router;