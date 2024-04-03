import express from "express";
import adminRouter from "../admin/admin.router";
import webRouter from "../web/web.router";


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Web Development...");
});

// admin routes
router.use("/admin", adminRouter);

//website Routes
router.use("/web" , webRouter);

router.get("/errors/500", function (req, res) {
  res.render("errors/500");
});

module.exports = router;
