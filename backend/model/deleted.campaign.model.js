const mongoose = require('mongoose');

const deletedCampaignSchema = new mongoose.Schema({
    campaignId: String,
    userId: String,
    title: String,
    description: String,
    targetAmount: Number,
    collectedAmount: Number,
    est: Date,
    endDate: Date,
    deletedAt: { type: Date, default: Date.now } // Track when it was deleted
}, { timestamps: true });

module.exports = mongoose.model('DeletedCampaign', deletedCampaignSchema);
