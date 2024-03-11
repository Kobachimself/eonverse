const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
    host: 'b5qr92bncfhw5gsnuz3b-mysql.services.clever-cloud.com',
    user: 'uulkeempqmal8d36',
    password: '8p0vt4LQ7zS5o04gKQeZ',
    database: 'b5qr92bncfhw5gsnuz3b',
    connectionLimit: 10
});

// Function to insert transaction details into the database
async function insertTransaction(userId, productId, amount, status) {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('INSERT INTO transactions (user_id, product_id, amount, status) VALUES (?, ?, ?, ?)', [userId, productId, amount, status]);
        connection.release();
        return result.insertId;
    } catch (error) {
        console.error('Error inserting transaction:', error);
        throw new Error('Failed to insert transaction into the database.');
    }
}

// Function to retrieve user data from the database
async function getUserData(userId) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
        connection.release();
        return rows[0];
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw new Error('Failed to retrieve user data from the database.');
    }
}

// Function to retrieve product/package details from the database
async function getProductData(productId) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [productId]);
        connection.release();
        return rows[0];
    } catch (error) {
        console.error('Error retrieving product data:', error);
        throw new Error('Failed to retrieve product data from the database.');
    }
}

module.exports = {
    insertTransaction,
    getUserData,
    getProductData
};
