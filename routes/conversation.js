const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/conversation');

router.get('/get_all_transcript', ConversationController.get_all_transcript);
router.get('/get_single_transcript', ConversationController.get_single_transcript);

module.exports = router;
