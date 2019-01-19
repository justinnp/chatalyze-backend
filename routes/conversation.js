const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/conversation');

router.get('/get_all_keys', ConversationController.get_all_keys);
router.post('/get_single_transcript', ConversationController.get_single_transcript);
router.post('/update_transcript', ConversationController.update_transcript);

module.exports = router;
