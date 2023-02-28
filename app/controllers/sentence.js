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
      const sentence = await Sentence.getOne(id);
      if (sentence) {
        response.status(200).json(sentence);
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
      const date = new Date();
      const sentence = request.body;
      if (!sentence.description || !sentence.crime_year || !sentence.jail_time || !sentence.country) return response.status(400).json('All fields must be filled');

      const existingSentence = await Sentence.getByDescription(sentence.description.toLowerCase());
      if (existingSentence) return response.status(409).json(`Sentence ${sentence.description} already exists`)

      await Sentence.create({
        description: sentence.description.toLowerCase(),
        crime_year: sentence.crime_year,
        jail_time: sentence.jail_time,
        country: sentence.country.toLowerCase(),
        created_at: date
      })
      response.status(200).json(`Sentence created succesfully`);
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