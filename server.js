const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'mydb.c7o8swswgfke.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'dharani21063',
  database: 'mydb'
});

app.post('/register', (req, res) => {
  const { username, email, dob, age, gender, password } = req.body;

  // Assuming you have a 'users' table
  const sql = 'INSERT INTO registernew (username, email, dob, age, gender, password) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, email, dob, age, gender, password];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      return res.status(500).send('Error inserting data');
    }

    res.status(200).send('Registration successful! You can now login.');
  });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user exists and the password is correct
    connection.query('SELECT * FROM registernew WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        console.error('Error checking login credentials: ' + err.stack);
        return res.status(500).send('Error checking login credentials');
      }
  
      if (results.length === 0) {
        // User not found or password is incorrect
        return res.status(401).send('Invalid login credentials.');
      }
  
      // User found, return success message or user data as needed
      res.status(200).json({ message: 'Login successful!', user: results[0] });
    });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
