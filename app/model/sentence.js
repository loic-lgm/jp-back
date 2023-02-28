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
      LEFT JOIN sentence_category ON sentence.id = sentence_category.id_sentence
      LEFT JOIN category ON category.id = sentence_category.id_category
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

  async update(sentence){
    const sentenceToUpdate = await pool.query(`
        UPDATE "sentence" SET description = $1, crime_year = $2, jail_time = $3, country = $4, updated_at = $5 WHERE id = $6;`,
        [sentence.description, sentence.crime_year, sentence.jail_time, sentence.country, sentence.udpated_at, sentence.id]);
        return sentenceToUpdate;
  },

  async delete(id) {
    await pool.query(
      `DELETE FROM "sentence" WHERE id = $1;`,
      [id]
    )
  }
}

module.exports = Sentence;