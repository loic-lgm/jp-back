const pool = require("../config");

const User = {
  async getAll() {
    const users = await pool.query(`SELECT username, email, role, day_score, global_score, created_at, updated_at FROM user_account;`);
    return users.rows;
  },

  async getOne(id) {
    const user = await pool.query(
        `SELECT username, email, role, day_score, global_score, created_at, updated_at FROM user_account WHERE id = $1;`, 
        [id]
    );
    return user.rows[0];
  }
}

module.exports = User;