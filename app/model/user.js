const pool = require("../config");

const User = {
  async getAll(){
    const users = await pool.query(`select username, email, role, day_score, global_score, created_at, updated_at from "user_account"; `);
    return users.rows;
  }
}

module.exports = User;