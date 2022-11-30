const express = require("express");
const multer = require("multer");
const apitrollers = require("../controller/apiControllers");
const authverify = require("../helper/authVerify.helper");
const route = express.Router();

const upload = multer({ dest: "uploads/" });

route.post("/anime/top/reset", apitrollers.reset);
route.post(
  "/account/profile/update",
  authverify.authVerify,
  upload.single("avatar"),
  apitrollers.profile_update
);
route.post(
  "/anime/inventory/add",
  authverify.authVerify,
  apitrollers.inventoryAdd
);
route.post(
  "/anime/inventory/remove",
  authverify.authVerify,
  apitrollers.inventoryRemove
);
route.post("/anime/star", authverify.authVerify, apitrollers.star);
route.post("/anime/report", authverify.authVerify, apitrollers.report);
route.post("/account/password", apitrollers.password);
route.post("/account/login", apitrollers.login);
route.post("/anime/comment", apitrollers.comment);
route.post(
  "/comment",
  authverify.authVerify,
  upload.single("image"),
  apitrollers.comment_post
);
route.get("/anime", apitrollers.anime);

module.exports = route;
