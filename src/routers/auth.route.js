const express = require("express")
const authCtrl = require("../ctrls/auth.ctrl")
const verifyToken = require("../middleware/auth.mw")
const router = express.Router();

router.post("/login", authCtrl.login)
router.post("/signup", authCtrl.signup)
router.post("/google", authCtrl.loginGoogle)
router.post("/acc-google", verifyToken, authCtrl.updateUserGoogle)
router.get("/me", verifyToken, authCtrl.me)

module.exports = router