const express = require("express");

const auth = require("../../middlewares/token");

const router = express.Router();

const authRoutes = require("./auth");
const contactsRoutes = require("./contacts");
const userRoutes = require("./users");

router.use("/auth", authRoutes);
router.use("/contacts", auth, contactsRoutes);
router.use("/users", auth, userRoutes);

module.exports = router;
