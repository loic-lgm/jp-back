const Sentence = require("../model/sentence");

const sentenceController = {
  findAll: async (request, response) => {
    try {
      const sentences = await Sentence.getAll()
      response.status(200).json(sentences);

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
  },

  create: async (request, response) => {
    try {
      const category = request.body;
      if (!category.name || !category.description) return response.status(400).json('All fields must be filled');

      const existingCategory = await Category.getByName(category.name.toLowerCase());
      if (existingCategory) return response.status(409).json(`Category ${category.name} already exists`)

      await Category.create({
        name: category.name.toLowerCase(),
        description: category.description
      })
      response.status(200).json(`Category ${category.name} created succesfully`);
    } catch (err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  },

  update: async (request, response) => {
    try {
      const {id} = request.params;
      const existingCategory = await Category.getOne(id);
      if (!existingCategory) return response.status(404).json('Category not found');

      const category = request.body;
      if (!category.name || !category.description) return response.status(400).json('All fields must be filled');

      const existingCategoryByName = await Category.getByName(category.name.toLowerCase());
      if (category.name !== existingCategory.name && existingCategoryByName) return response.status(409).json(`Category ${category.name} already exists`);

      console.log(await Category.update({
        id: id,
        name: category.name.toLowerCase(),
        description: category.description
      }))
      response.status(200).json('Category updated succesfully');
    } catch (err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  },

  delete: async (request, response) => {
    try {
      const {id} = request.params;
      const existingCategory = await Category.getOne(id);
      if (!existingCategory) return response.status(404).json('Category not found');

      await Category.delete(id);
      response.status(200).json('Category deleted succesfully');

    } catch(err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  }
}

module.exports = sentenceController;