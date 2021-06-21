const express = require('express');
const router = express.Router()
const comments_controller = require('../controllers/comments')
const auth_controler = require('../middleware/check_auth')

router.post('/getComments', comments_controller.getComments)
router.post('/addComments',auth_controler,comments_controller.addComment)
router.post('/deleteComments',auth_controler,comments_controller.deleteComments)
router.post('/SearchComment',comments_controller.SearchComment)
router.post('/deleteCommentsAdmin',comments_controller.deleteCommentsAdmin)


module.exports = router
