const router = require("express").Router();
const userController = require("../controller/userController.js");
const isAuth = require("../middlewares/isAuthenticate.js");

router.get("/all", userController.allUsers);

router.post("/create", userController.createUser);

router.post("/login", userController.loginUser);

router.get("/profile", isAuth, userController.myProfile);

router.put("/resetpassword", isAuth, userController.resetPassword);

module.exports = router;
