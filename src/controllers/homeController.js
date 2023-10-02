// const path = require("path");
// const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/CRUDService");
const connection = require("../config/database");
const User = require("../models/user");


const getHomepage = async (req, res) => {
  let results = await User.find({});
  return res.render('home.ejs', { listUsers: results });
};


const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  // let [results, fields] = await connection.query(
  //   `INSERT INTO Users (email, name, city)
  //    VALUES (?,?,?)
  //   `,
  //   [email, name, city]
  // );

  await User.create({
    email: email,
    name: name,
    city: city,
  })

  res.send("Created success");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId).exec()
  res.render("edit.ejs", { user: user });
};

const postUpdateUser = async (req, res) => {
  updateUser(req, res);
  res.redirect("/");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  //let user = await getUserById(userId);
  let user = await User.findById(userId).exec()
  res.render("delete.ejs", { user: user });
};

const postHandleRemoveUser = async (req, res) => {
  deleteUser(req, res);
  res.redirect("/");
};

module.exports = {
  getHomepage,
  postCreateUser,
  getCreatePage,
  postDeleteUser,
  postHandleRemoveUser,
  getUpdatePage,
  postUpdateUser,
};
