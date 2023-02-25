const User = require("../model/user");
const bcrypt = require("bcrypt");

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
      try {
        const { id } = request.params;
        const user = request.body;
        const dateNow = new Date();
        const userToUpdate = await User.getOne(id);
        const existingUserByEmail = await User.getByEmail(userToUpdate.email);
        const existingUserByUsersname = await User.getByUsername(userToUpdate.username);

        if (!userToUpdate) return response.status(400).json("User not found");
        if (user.email != userToUpdate.email && existingUserByEmail) return response.status(409).json(`Email already exists`);
        if (user.username != userToUpdate.username && existingUserByUsersname) return response.status(409).json(`Username already exists`);
        
        const newPassword = bcrypt.hash(user.password, 5, async function(error, bcryptPassword) {
          return bcryptPassword
        })
  
        await User.update({
          id: user.id,
          username: user.username,
          email: user.email,
          password: newPassword ? newPassword : userToUpdate.password,
          role: user.role ? user.role : userToUpdate.role,
          day_score: user.day_score ? user.day_score : userToUpdate.day_score,
          global_score: user.global_score ? user.global_score : userToUpdate.global_score,
          created_at: userToUpdate.created_at,
          updated_at: dateNow
        })

        response.status(200).json("Updated succesfully");
      } catch (err) {
        console.log(err)
        response.status(500).json("Error occured");
      }
    },

    delete: async (request, response) => {
      try {
        const {id} = request.params;
        const userToDelete = User.getOne(id);

        if (!userToDelete) return response.status(400).json('User not found');

        await User.delete(id)
        response.status(200).json('User deleted succesfully');
      } catch (err) {
        console.log(err);
        response.status(500).json('Error occured');
      }
    }
  };
  
  module.exports = userController;