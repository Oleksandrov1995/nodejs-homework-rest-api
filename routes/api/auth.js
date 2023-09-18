const express = require("express");
const router = express.Router();
const { validateAuth } = require("../../middlewares/validateAuth");
const ctrl = require("../../controllers/auth");
const jsonParser = express.json();
const auth = require("../../middlewares/token");

router.post("/register", jsonParser, validateAuth, ctrl.register);
router.post("/login", jsonParser, validateAuth, ctrl.login);
router.post("/logout", auth, ctrl.logout);
router.get("/verify/:token", ctrl.verify);
router.post("/resendVerify", ctrl.resendVerify);

module.exports = router;
