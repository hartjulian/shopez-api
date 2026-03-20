const db = require('./index');

const getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};

const getOneProduct = async (productId) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);
    return result.rows[0];
};

const insertProduct = async (product) => {
    const result = await db.query('INSERT INTO products (description, price, brand, model) VALUES ($1, $2, $3, $4)', product);
    return result.rowCount;
};

const updateProduct = async (product) => {
    const result = await db.query('UPDATE products SET description = $2, price = $3, brand = $4, model = $5 WHERE id = $1', product);
    return result.rowCount;
};

const deleteProduct = async (productId) => {
    const result = await db.query('DELETE FROM products WHERE id = $1', [productId]);
    return result.rowCount;
};

module.exports = { getAllProducts, getOneProduct, insertProduct, updateProduct, deleteProduct };