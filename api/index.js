const express = require('express');
const mysql = require('mysql2/promise');
const otpGenerator = require('otp-generator');
const winston = require('winston');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// MySQL Connection
const pool = mysql.createPool({
    host: '10.104.0.2',
    user: 'root',
    port: 3306,
    password: '123456',
    database: 'mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json());

async function createDatabase() {
    const connection = await pool.getConnection();
    await connection.query('CREATE DATABASE IF NOT EXISTS otpdb');
    connection.release();
}

createDatabase().then(() => {
    logger.info('Database "otpdb" created or already exists.');
}).catch((error) => {
    logger.error('Error creating database:', error);
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS otps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(10) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

async function createTable() {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);
    connection.release();
}

createTable().then(() => {
    logger.info('Table "otps" created or already exists.');
}).catch((error) => {
    logger.error('Error creating table:', error);
});

app.post('/generate-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

        const connection = await pool.getConnection();

        const [rows, fields] = await connection.execute(
            'INSERT INTO otps (email, otp) VALUES (?, ?)',
            [email, otp]
        );

        connection.release();

        logger.info('OTP generated and stored successfully');
        res.status(201).json({
            message: 'OTP generated and stored successfully',
            otp,
            be: 1
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        const connection = await pool.getConnection();

        const [rows, fields] = await connection.execute(
            'SELECT * FROM otps WHERE email = ? AND otp = ?',
            [email, otp]
        );

        if (rows.length === 0) {
            res.status(400).json({ error: 'Invalid OTP' });
            connection.release();
            return;
        }

        await connection.execute('DELETE FROM otps WHERE email = ? AND otp = ?', [email, otp]);

        connection.release();

        logger.info('OTP verified successfully');
        res.status(200).json({ message: 'OTP verified successfully', be: 1 });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
