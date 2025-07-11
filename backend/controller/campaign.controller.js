const Campaign = require('../model/campaign.model');
const DeletedCampaign = require('../model/deleted.campaign.model');

const campaignController = {
    // Create a new campaign (All fields required, with validation)
    createCampaign: async (req, res) => {
        try {
            const { userId, description, targetAmount, endDate, title , collectedAmount, category} = req.body;

            // Check if all fields are provided
            if (!userId || !description || !targetAmount || !endDate || !title) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Validate description length
            if (description.length > 500) {
                return res.status(400).json({ error: 'Description cannot exceed 500 characters' });
            }

            // Validate amounts
            if (targetAmount <= 0 || collectedAmount < 0) {
                return res.status(400).json({ error: 'Target amount must be positive and collected amount cannot be negative' });
            }

            // Validate end date (should be in the future)
            if (new Date(endDate) <= new Date()) {
                return res.status(400).json({ error: 'End date must be a future date' });
            }

            const campaign = new Campaign({ userId, description, targetAmount, collectedAmount, endDate, title, category });
            await campaign.save();
            res.status(201).json(campaign);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all campaigns
    getAllCampaigns: async (req, res) => {
        try {
            const campaigns = await Campaign.find();
            res.status(200).json(campaigns);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a single campaign by ID
    getCampaignById: async (req, res) => {
        try {
            const campaign = await Campaign.findOne({ campaignId : req.params.id });

            if (!campaign) {
                return res.status(404).json({ message: 'Campaign not found' });
            }

            res.status(200).json(campaign);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a campaign (campaignId cannot be changed)
    updateCampaign: async (req, res) => {
        try {
            const { campaignId, ...updateData } = req.body;

            // Prevent campaignId from being updated
            if (campaignId) {
                return res.status(400).json({ error: 'Campaign ID cannot be changed' });
            }

            // Validate if update fields follow the rules
            if (updateData.description && updateData.description.length > 500) {
                return res.status(400).json({ error: 'Description cannot exceed 500 characters' });
            }
            if (updateData.targetAmount !== undefined && updateData.targetAmount <= 0) {
                return res.status(400).json({ error: 'Target amount must be positive' });
            }
            if (updateData.collectedAmount !== undefined && updateData.collectedAmount < 0) {
                return res.status(400).json({ error: 'Collected amount cannot be negative' });
            }
            if (updateData.endDate && new Date(updateData.endDate) <= new Date()) {
                return res.status(400).json({ error: 'End date must be a future date' });
            }

            const updatedCampaign = await Campaign.findOneAndUpdate({"campaignId":req.params.id}, updateData, { new: true });

            if (!updatedCampaign) {
                return res.status(404).json({ message: 'Campaign not found' });
            }

            res.status(200).json(updatedCampaign);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },



    deleteCampaign: async (req, res) => {
        try {
            const campaign = await Campaign.findOne({ campaignId : req.params.id });

            if (!campaign) {
                return res.status(404).json({ message: 'Campaign not found' });
            }
            //  Need to change this as per angular requirement {Problem for Future Sagar not the present one}
            // Check if the requesting user is the owner
            if (campaign.userId !== req.body.userId) {
                return res.status(403).json({ error: 'You can only delete your own campaign' });
            }

            // Move campaign to DeletedCampaign collection before deletion
            const deletedCampaign = new DeletedCampaign({
                campaignId: campaign.campaignId,
                userId: campaign.userId,
                title: campaign.title,
                description: campaign.description,
                targetAmount: campaign.targetAmount,
                collectedAmount: campaign.collectedAmount,
                est: campaign.est,
                endDate: campaign.endDate
            });

            await deletedCampaign.save(); // Save deleted campaign

            await campaign.deleteOne(); // Delete from main collection

            res.status(200).json({ message: 'Campaign deleted successfully and moved to backup' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = campaignController;
