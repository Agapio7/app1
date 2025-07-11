const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    donatedAmount: { type: Number, required: true },
    donatedDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ["Success", "Pending", "Failed"], required: true },
    message: { type: String },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
