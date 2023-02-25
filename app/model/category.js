const pool = require("../config");

const Category = {
  async getAll() {
    const categories = await pool.query(`SELECT * FROM category;`);
    return categories.rows;
  },

  async getOne(id) {
    const category = await pool.query(
        `SELECT * FROM category WHERE id = $1;`, 
        [id]
    );
    return category.rows[0];
  },

  async create(user) {
    const newUser = await pool.query(
      `INSERT INTO user_account ("username", "email", "password", "role", "day_score", "global_score", "created_at", "updated_at") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`, 
      [user.username, user.email, user.password, user.role, user.day_score, user.global_score, user.created_at, user.updated_at]
    );
    return newUser;
  },

  async getByUsername(username) {
    const user = await pool.query(
      `SELECT username, email, role, day_score, global_score, created_at, updated_at FROM user_account WHERE username = $1`,
      [username]
    );
    return user.rows[0];
  },

  async getByEmail(email) {
    const user = await pool.query(
      `SELECT * FROM user_account WHERE email = $1`,
      [email]
    );
    return user.rows[0];
  },

  async update(user){
    const userToUpdate = await pool.query(`
        UPDATE "user_account" SET username = $1, email = $2, password = $3, role = $4, day_score = $5, global_score = $6, created_at = $7, updated_at = $8 WHERE id = $9;`,
        [user.username, user.email, user.password, user.role, user.day_score, user.global_score, user.created_at, user.updated_at, user.id]);
        return userToUpdate;
  },

  async delete(id) {
    await pool.query(
      `DELETE FROM "user_account" WHERE id = $1;`,
      [id]
    )
  }
}

module.exports = Category;