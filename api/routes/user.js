const express = require('express');
const router = express.Router()
const user_controller = require('../controllers/user')
const auth_controler = require('../middleware/check_auth')
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/
router.post('/singIn', user_controller.singIn)
router.post('/singUp', user_controller.singUp)
router.post('/getUserData',auth_controler,user_controller.getUserData)
router.post('/updateUserInfo',auth_controler,user_controller.updateUserInfo)
router.post('/getUsersByYear',user_controller.getUsersByYear)
router.post('/getAllUsers',user_controller.getAllUsers)

module.exports = router
