const router = require("express").Router();
const userRoute = require("./userRoutes");  
const postRoute = require("./postRoutes");
const commentRoute = require("./commentRoutes");

router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);

module.exports = router;
