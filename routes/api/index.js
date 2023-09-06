const express = require("express");

const auth = require("../../middlewares/token");

const router = express.Router();

const authRoutes = require("./auth");
const contactsRoutes = require("./contacts");

router.use("/auth", authRoutes);
router.use("/contacts",auth, contactsRoutes);

module.exports = router;

