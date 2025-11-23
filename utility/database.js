const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '****',
    database: '****'
});

conn.connect((err) => {
    if (err) {
        console.log("MySQL bağlantı hatası:", err);
    } else {
        console.log("MySQL bağlantısı başarılı!");
    }
});

module.exports = conn;
