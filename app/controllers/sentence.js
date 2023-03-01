const Sentence = require("../model/sentence");
const Category = require("../model/category");
const Sentence_Category = require("../model/sentence_category");

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

  findRandoms: async (request, response) => {
    try {
      const sentences = await Sentence.getRandoms(1)
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
      const categoryIds = sentence.categories;

      if (!sentence.description || !sentence.crime_year || !sentence.jail_time || !sentence.country) return response.status(400).json('All fields must be filled');

      const existingSentence = await Sentence.getByDescription(sentence.description.toLowerCase());
      if (existingSentence) return response.status(409).json(`Sentence ${sentence.description} already exists`)

      const createdSentence = await Sentence.create({
        description: sentence.description.toLowerCase(),
        crime_year: sentence.crime_year,
        jail_time: sentence.jail_time,
        country: sentence.country.toLowerCase(),
        created_at: date
      })

      if (categoryIds && categoryIds.length > 0) {
        categoryIds.forEach(async categoryId => {
          try {
            if (await Category.getOne(categoryId)) {
              await Sentence_Category.create({
                id_sentence: createdSentence.id,
                id_category: categoryId
              })
            }
          } catch (err) {
            console.log(err);
          }
        })
      }

      return response.status(200).json(`Sentence created succesfully`);
    } catch (err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  },

  update: async (request, response) => {
    try {
      const date = new Date();
      const {id} = request.params;
      const existingSentence = await Sentence.getOne(id);
      if (!existingSentence) return response.status(404).json('Sentence not found');

      const sentence = request.body;
      if (!sentence.description || !sentence.crime_year || !sentence.jail_time || !sentence.country) return response.status(400).json('All fields must be filled');

      const existingSentenceByDescription = await Sentence.getByDescription(sentence.description.toLowerCase());
      if (sentence.description !== existingSentence.descritpion && existingSentenceByDescription) return response.status(409).json(`Sentence already exists`);

      await Sentence.update({
        id: id,
        description: sentence.description.toLowerCase(),
        crime_year: sentence.crime_year,
        jail_time: sentence.jail_time,
        country: sentence.country,
        updated_at: date
      })
      response.status(200).json('Category updated succesfully');
    } catch (err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  },

  delete: async (request, response) => {
    try {
      const {id} = request.params;
      const existingSentence = await Sentence.getOne(id);
      if (!existingSentence) return response.status(404).json('Sentence not found');

      await Sentence.delete(id);
      response.status(200).json('Sentence deleted succesfully');

    } catch(err) {
      console.log(err);
      response.status(500).json('Error occured');
    }
  }
}

module.exports = sentenceController;