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
    },

    findOne: async (request, response) => {
      try {
        const { id } = request.params
        const user = await User.getOne(id);
        response.status(200).json(user);
      } catch (err) {
        console.log(err);
      }
    },

    create: async (request, response) => {
      try {
        const currentDate = new Date();
        const user = request.body;

        const existingUserByUsersname = await User.getByUsername(user.username);
        const existingUserByEmail = await User.getByEmail(user.email);
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!user.username || !user.email || !user.password) {
          return response.status(400).json("All fields must be filled");
        }

        if (user && !existingUserByEmail && !existingUserByUsersname) {
          if (user.email.match(regexEmail)) {
            bcrypt.hash(user.password, 5, async function(error, bcryptPassword) {
              await User.create({
                username: user.username,
                email: user.email,
                password: bcryptPassword,
                role: "user",
                created_at: currentDate
              })
            })
            return response.status(201).json({message: `User ${user.email} created`})
          } else {
            return response.status(409).json({message: `Email is not valid`})
          }
        }
        if (user && existingUserByEmail) {
          return response.status(409).json({message: `Email already exists`})
        }
        if (user && existingUserByUsersname) {
          return response.status(409).json({message: `Username already exists`})
        }

      } catch (err) {
        console.log(err)
        response.status(400).json({ error: "User was not created" });
      }
    },

    update: async (request, response) => {
      const user = request.body
    }
  };
  
  module.exports = userController;