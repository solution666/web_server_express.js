const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'student',
  host: '0.tcp.ngrok.io',
  database: 'database',
  password: 'password',
  port: 3000,
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint for getting all users from the 'users' table
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error retrieving users');
    } else {
      res.json(result.rows);
    }
  });
});

// Endpoint for adding a new student to the 'students' table
app.post('/students', (req, res) => {
  const { first_name, last_name, age } = req.body;
  pool.query(
    'INSERT INTO students (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
    [first_name, last_name, age],
    (error, result) => {
      if (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error adding student');
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

// Endpoint for getting all students sorted by age in ascending or descending order
app.get('/students', (req, res) => {
  const sort = req.query.sort;
  let query = 'SELECT * FROM students ORDER BY age';
  if (sort === 'desc') {
    query += ' DESC';
  }
  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error retrieving students');
    } else {
      res.json(result.rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
