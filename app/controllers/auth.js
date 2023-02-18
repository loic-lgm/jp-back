const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {

    login: async (request, response) => {
      
      const user = request.body;

      if (!user.email ||!user.password) {
          return response.status(400).json({message: 'All fields must be filled'});
      }
      
      const existingUser = await User.getByEmail(user.email);
      
      if (!existingUser) return response.status(401).json('Unauthorized');

      // Comparaison du hash de password donné par l'user avec celui présent en db. 
      const match = await bcrypt.compare(user.password, existingUser.password);
      
      if (!match) {
          return response.status(400).json('Bad credentials');
      }

      // Si le hash correspond, est renvoyé un token à partir d'une clef secrète.
      jwt.sign(
        existingUser ,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            return response.status(400).json({err})
          }
          response.json({ token });
        }
      );
    },

    authorization: async(request, response) => {
        // Si le token est valide on renvoit le token ainsi que les données de l'utilisateur
        const token = request.token;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, results) => {
            if(error){
                return response.status(500);
            }
            const userData = results;
            console.log(userData);
            const { password, ...authData } = userData;
      
            response.json({ authData, token });
        });
      }
  };
  module.exports = authController;