const db = require('./index');
const bcrypt = require('bcrypt');

const getUserByUsername = async (username) => {
    const result = await db.query('SELECT email AS username, password FROM customers WHERE email = $1', [username]);
    return result.rows[0];
};

const verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};

const createNewUser = async (username, password) => {
    const result = await db.query('SELECT COUNT (*) FROM customers WHERE email = $1', [username]);
    if (result.rows[0].count > 0) {
        return false;
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      db.query('INSERT INTO customers (email, password) VALUES ($1, $2);', [username, hashedPassword]);
      return true;
    };
}

module.exports = { getUserByUsername, verifyPassword, createNewUser };