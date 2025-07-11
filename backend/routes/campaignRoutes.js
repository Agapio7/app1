const express = require('express');
const router = express.Router();
const campaignController = require('../controller/campaign.controller');

// Define routes
router.post('/campaigns', campaignController.createCampaign);
router.get('/campaigns', campaignController.getAllCampaigns);
router.get('/campaigns/:id', campaignController.getCampaignById);
router.put('/campaigns/:id',campaignController.updateCampaign);
router.delete('/campaigns/:id',campaignController.deleteCampaign);
module.exports = router;