const Category = require("../model/category");

const categoryController = {
  findAll: async (request, response) => {
    try {
      const categories = await Category.getAll()
      response.status(200).json(categories);

    } catch (err) {
      console.log(err)
      response.status(500).json('Error occured');
    }
  }
}

module.exports = categoryController;