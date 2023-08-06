const mysql = require('mysql');
const sql = require('./sql.js');

// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host : '127.0.0.1',
//     port : 3306,
//     user : 'root',
//     password : 'June123!@#',
//     database: 'dev'
// });


const pool = mysql.createPool({
    connectionLimit : process.env.MYSQL_LIMIT,
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});


//pool.query(querystring, values, callback)
const query = async (alias, values) => {
    return new Promise ((resolve, reject) => pool.query(sql[alias], values, (error, results) => {
        if (error) {
            console.log(error);
            reject({
                error
            });
        } else resolve(results);
    }));
}

module.exports = {
    query
}