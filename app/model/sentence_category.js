const pool = require("../config");

const Sentence_Category = {
  async create(sentence_category){
    const newSentenceCategory = await pool.query(`
    INSERT INTO "sentence_category" ("id_sentence", "id_category") VALUES ($1,$2);
    `, [sentence_category.id_sentence, sentence_category.id_category]);
    return newSentenceCategory.rows;
  },

  async getBySentenceId(id)  {
    const sentenceCategory = await pool.query(`
    SELECT * FROM sentence_category
    WHERE sentence_category.id_sentence = $1;`,
      [id]
    );
    return sentenceCategory.rows;
  },

  async getAll() {
    const all = await pool.query(`
      SELECT * FROM sentence_category`,
    );
    return all.rows;
  },

  async delete(id_sentence){
    await pool.query(`
      DELETE FROM "sentence_category" WHERE id_sentence = $1;`,[id_sentence]);
  }
}

module.exports = Sentence_Category; 