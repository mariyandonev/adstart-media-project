import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import adminAuth from './auth.js';
import { validateForm } from './utils.js';

const app = express();
app.use(cors());
// Restricts only to the specific frontend
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Database pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Auto-create table if user don't use npm run setup-db
async function initDB() {
    try {
        const createTableSQL = `
      CREATE TABLE IF NOT EXISTS forms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(50) NOT NULL,
        company VARCHAR(255) NOT NULL,
        choices TEXT NOT NULL,
        other TEXT,
        budget VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        await pool.query(createTableSQL);
        console.log("Table 'forms' ensured");
    } catch (err) {
        console.error('Error ensuring table:', err);
    }
}

// POST /submit-form
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        const validationErrors = validateForm(formData);
        if (validationErrors) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const { step1, step2, step3 } = formData;
        const sql = `
          INSERT INTO forms (name, email, phoneNumber, company, choices, other, budget)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            step1.name,
            step1.email,
            step1.phoneNumber || null,
            step1.company || null,
            (step2.choices && step2.choices.length > 0)
                ? step2.choices.join(', ')
                : null,
            step2.other || null,
            step3.budget || null
        ];

        const [result] = await pool.query(sql, values);
        res.status(201).json({
            success: true,
            message: 'Form saved',
            id: result.insertId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// GET /forms (admin only, filter + sort)
app.get('/forms-data', adminAuth, async (req, res) => {
    try {
        let sql = 'SELECT * FROM forms';
        const params = [];

        if (req.query.search) {
            sql += ' WHERE name LIKE ? OR email LIKE ?';
            params.push(`%${req.query.search}%`, `%${req.query.search}%`);
        }

        if (req.query.sortBy) {
            const allowed = new Set(['id', 'name', 'email', 'company', 'budget', 'created_at']);
            const sortBy = allowed.has(req.query.sortBy) ? req.query.sortBy : 'created_at';
            const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
            sql += ` ORDER BY ${sortBy} ${order}`;
        }

        const [results] = await pool.query(sql, params);
        res.json({ success: true, data: results });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
initDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
