const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating unique campaign IDs

const campaignSchema = new mongoose.Schema({
    campaignId: {
        type: String,
        default: uuidv4, // Auto-generate a unique campaign ID
        unique: true,
        immutable: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    title: { 
        type: String, 
        required: true, 
        trim: true, 
        minlength: 5, 
        maxlength: 100 
    }, // Added campaign title
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10, // Ensure meaningful descriptions
    },
    targetAmount: {
        type: Number,
        required: true,
        min: [1, "Target amount must be greater than zero"],
    },
    collectedAmount: {
        type: Number,
        default: 0, // Default to 0 instead of requiring input
        min: [0, "Collected amount cannot be negative"],
    },
    est: {
        type: Date,
        default: Date.now,
        immutable: true, // Prevent modification
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.est; // Ensure endDate is after creation
            },
            message: "End date must be later than the campaign start date",
        },
    },
    category:{
        type:String,
        required:true
    }
}, { timestamps: true }); // Automatically adds `createdAt` & `updatedAt`

module.exports = mongoose.model('Campaign', campaignSchema);
