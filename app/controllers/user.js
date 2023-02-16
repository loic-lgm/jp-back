const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const userController = {
    findAll: async (request, response) => {
      try {
        const users = await User.getAll();
        response.status(200).json(users);
      } catch (err) {
        console.error(err);
      }
    }
  };
  
  module.exports = userController;