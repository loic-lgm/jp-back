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
      `SELECT username, email, role, day_score, global_score, created_at, updated_at FROM user_account WHERE email = $1`,
      [email]
    );
    return user.rows[0];
  }
}

module.exports = User;