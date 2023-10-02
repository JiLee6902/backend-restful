const express = require("express");
const {
  getHomepage,
  postUpdateUser,
  postDeleteUser,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postHandleRemoveUser,
} = require("../controllers/homeController");
const rounter = express.Router();

// router.Method('/route', handler)

rounter.get("/", getHomepage);


rounter.get("/create", getCreatePage);
rounter.get("/update/:id", getUpdatePage);

rounter.post("/create-user", postCreateUser);
rounter.post("/update-user", postUpdateUser);
rounter.post("/delete-user/:id", postDeleteUser);
rounter.post("/delete-user", postHandleRemoveUser);


module.exports = rounter;
