// External imports
const express = require("express");
const router = express.Router();


//Internal imports

const decorateHtmlRes = require("../middlewares/common/decorateHtmlResponse");
const {getsignup,addUser} = require("../controller/signupController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler} = require("../middlewares/users/userValidators");

// get inbox page
router.get("/", decorateHtmlRes("Signup"),  getsignup);

//
router.post("/", avatarUpload, addUserValidators, addUserValidationHandler, addUser,);


module.exports = router;