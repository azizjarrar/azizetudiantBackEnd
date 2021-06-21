const express = require('express');
const router = express.Router()
const user_controller = require('../controllers/user')
const auth_controler = require('../middleware/check_auth')
/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/

const path = require('path')
var fs = require('fs')
var mkdirp = require('mkdirp')
const multer = require('multer')
const crypto = require('crypto')
/********************profile picture multer*********************** */
const storageMulter = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/images/')
    },
    filename:(req,file,cb)=>{
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
             file_name = buf.toString('hex') + path.extname(file.originalname)

             cb(null,file_name)
        })
    }
})
const fileFilter = (req,file,cb)=>{

    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true)
    }else{
        cb(new Error('type invalide'),false)
    }
}
const uploadMulter = multer({fileFilter:fileFilter,storage:storageMulter})
/**************************check if file exist***************************************/
function checkUploadPath(req, res, next) {
        fs.exists('./uploads/images/', function(exists) {
       if(exists) {
         next();
       }
       else {
           
        mkdirp('./uploads/images/').then(data=>{
            next();
        }).catch(error=>{
            console.log('Error in folder creation='+error.message);
            next();
        })
       }
    })
}

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
