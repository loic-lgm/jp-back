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
  },

  findOne: async (request, response) => {
    try {
      const {id} = request.params;
      const category = await Category.getOne(id);
      if (category) {
        response.status(200).json(category);
      } else {
        response.status(404).json('404 Not found')
      }
    } catch (err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  }
}

module.exports = categoryController;