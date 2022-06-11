const MySqlAdapter = require('./MySqlAdapter');

const pripojeni = new MySqlAdapter(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
);

pripojeni.connect();

module.exports = pripojeni;
