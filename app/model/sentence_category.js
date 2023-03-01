const pool = require("../config");

const Sentence_Category = {
  async create(sentence_category){
    const newSentenceCategory = await pool.query(`
    INSERT INTO "sentence_category" ("id_sentence", "id_category") VALUES ($1,$2);
    `, [sentence_category.id_sentence, sentence_category.id_category]);
    return newSentenceCategory.rows;
  },

  async findByPlantId(id)  {
    const plantClimat = await pool.query(`
    SELECT * FROM plant_climat
    WHERE plant_climat.plant_id = $1;`,
      [id]
    );
    return plantClimat.rows[0];
  },

  async delete(id_sentence){
    await pool.query(`
        DELETE FROM "sentence_category" WHERE id_sentence_id = $1;`,[id_sentence]);
  }
}

module.exports = Sentence_Category; 