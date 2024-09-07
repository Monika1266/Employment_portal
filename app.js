const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'mydb.c7o8swswgfke.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'dharani21063',
  database: 'mydb'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as id ' + connection.threadId);
});

const username = 'example_user';
const password = 'hashed_password'; // You should hash passwords before storing them
const email = 'example@email.com';

const sql = 'INSERT INTO registernew (username, password, email) VALUES (?, ?, ?)';
const values = [username, password, email];

connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      return;
    }

    console.log('Data inserted successfully:', results);

    // Close the connection after the INSERT operation
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection: ' + err.stack);
        return;
      }

      console.log('Connection closed.');
    });
});
    