const db = require('./index');

const getAllCustomers = async () => {
    const result = await db.query('SELECT * FROM customers');
    return result.rows;
};

const createNewCustomer = async (customer) => {
    const emailCheck = await db.query('SELECT COUNT(*) FROM customers WHERE email = $1', [customer[2]]);
    if (emailCheck.rows[0].count > 0) {
        return 0;
    } else { 
        const result = await db.query('INSERT INTO customers (first_name, last_name, email, phone) VALUES ($1, $2, $3, $4)', customer);
        return result.rowCount;
    };
};

const getOneCustomer = async (customerId) => {
    const result = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    return result.rows;
};

const updateCustomer = async (customer) => {
    const result = await db.query('UPDATE customers SET first_name = $2, last_name = $3, email = $4, phone = $5 WHERE id = $1', customer);
    return result.rowCount;
};

const deleteCustomer = async (customerId) => {
    const result = await db.query('DELETE FROM customers WHERE id = $1', [customerId]);
    return result.rowCount;
};

module.exports = { getAllCustomers, createNewCustomer, getOneCustomer, updateCustomer, deleteCustomer };