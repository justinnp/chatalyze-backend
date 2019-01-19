const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/conversation');

router.get('/get_all_keys', ConversationController.get_all_keys);
router.post('/update_transcript', ConversationController.update_transcript);
router.get('/get_all_transcript', ConversationController.get_all_transcript);
router.post('/clear', ConversationController.clear);


module.exports = router;
