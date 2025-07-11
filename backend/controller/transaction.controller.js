const Transaction = require("../model/transaction.model");

// Create a new transaction
const tranController =  {
    createTransaction : async (req, res) => {
        try {
            const { userId, donatedAmount, paymentMethod, transactionId, status, message } = req.body;

            const newTransaction = new Transaction({
                userId: userId,
                donatedAmount: donatedAmount,
                paymentMethod: paymentMethod,
                transactionId: transactionId,
                status: status,
                message: message,
            });

            await newTransaction.save();
            res.status(201).json({ success: true, transaction: newTransaction });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get all transactions
    getAllTransactions : async (req, res) => {
        try {
            const transactions = await Transaction.find().populate("userId", "name email");
            res.status(200).json({ success: true, transactions });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    // Get a transaction by ID
    getTransactionById : async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id);
            if (!transaction) {
                return res.status(404).json({ success: false, message: "Transaction not found" });
            }
            res.status(200).json({ success: true, transaction });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
}

module.exports = tranController