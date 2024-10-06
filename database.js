import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    // For make more privacy and ensure noone get
    // the secret information
    // every local host machine should be there own .env file in their computer
    // and use npm i dotenv for install the env file
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// this is show some gerbage json file
// const result = await pool.query("select * from notes")
// console.log(result)

async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}


export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `,[id])
    return rows[0]
  }
  
export async function createNote(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents])
      const id = result.insertId
    return getNote(id)
}
