const express = require('express');
const router = express.Router()
const universities_controller = require('../controllers/universities')
const auth_controler = require('../middleware/check_auth')

router.post('/getuniversities', universities_controller.getuniversities)
router.post('/getOneuniversities', universities_controller.getOneuniversities)
router.post('/getmetiers',universities_controller.getmetiers)
router.post('/getspecialites',universities_controller.getspecialites)
router.post('/getAllspecialites',universities_controller.getAllspecialites)

module.exports = router
