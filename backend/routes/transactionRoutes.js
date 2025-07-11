const express = require("express");
const tranController = require("../controller/transaction.controller");
const router = express.Router();


router.post("/transactions", tranController.createTransaction); // Create transaction
router.get("/transactions", tranController.getAllTransactions); // Get all transactions
router.get("/transactions/:id", tranController.getTransactionById); // Get transaction by ID

module.exports = router;
