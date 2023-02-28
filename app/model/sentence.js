const pool = require("../config");

const Sentence = {
  async getAll() {
    const sentences = await pool.query(`
      SELECT sentence.*, array_agg(DISTINCT category.name) AS categories FROM sentence
      LEFT JOIN sentence_category ON sentence.id = sentence_category.id_sentence
      LEFT JOIN category ON category.id = sentence_category.id_category
      GROUP BY sentence.id
    ;`);
    return sentences.rows;
  },

  async getOne(id) {
    const sentence = await pool.query(`
      SELECT sentence.*, array_agg(DISTINCT category.name) AS categories FROM sentence
      INNER JOIN sentence_category ON sentence.id = sentence_category.id_sentence
      INNER JOIN category ON category.id = sentence_category.id_category
      WHERE sentence.id = $1
      GROUP BY sentence.id
      ;`, 
      [id]
    );
    return sentence.rows[0];
  },

  async create(sentence) {
    const newSentence = await pool.query(
      `INSERT INTO sentence ("description", "crime_year", "jail_time", "country", "created_at") VALUES ($1,$2,$3,$4,$5);`, 
      [sentence.description, sentence.crime_year, sentence.jail_time, sentence.country, sentence.created_at]
    );
    return newSentence;
  },

  async getByDescription(description) {
    const sentence = await pool.query(
      `SELECT * FROM sentence WHERE description = $1`,
      [description]
    );
    return sentence.rows[0];
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