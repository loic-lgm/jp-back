const pool = require("../config");

const Sentence = {
  async getAll() {
    const sentences = await pool.query(`
      SELECT sentence.*, array_agg(DISTINCT category.name) AS categories FROM sentence
      INNER JOIN sentence_category ON sentence.id = sentence_category.id_sentence
      INNER JOIN category ON category.id = sentence_category.id_category
      GROUP BY sentence.id
    ;`);
    return sentences.rows;
  },

  async getOne(id) {
    const category = await pool.query(
        `SELECT * FROM category WHERE id = $1;`, 
        [id]
    );
    return category.rows[0];
  },

  async create(category) {
    const newCategory = await pool.query(
      `INSERT INTO category ("name", "description") VALUES ($1,$2);`, 
      [category.name, category.description]
    );
    return newCategory;
  },

  async getByName(name) {
    const category = await pool.query(
      `SELECT * FROM category WHERE name = $1`,
      [name]
    );
    return category.rows[0];
  },

  async update(category){
    const categoryToUpdate = await pool.query(`
        UPDATE "category" SET name = $1, description = $2 WHERE id = $3;`,
        [category.name, category.description, category.id]);
        return categoryToUpdate;
  },

  async delete(id) {
    await pool.query(
      `DELETE FROM "category" WHERE id = $1;`,
      [id]
    )
  }
}

module.exports = Sentence;