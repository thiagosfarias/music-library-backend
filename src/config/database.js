const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    password VARCAHR(255) NOT NULL
)`

const MUSIC_SCHEMA = `CREATE TABLE IF NOT EXISTS music (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(40) NOT NULL,
    fk_singer INTEGER,
    FOREIGN KEY(fk_singer) REFERENCES singer(id)
)`

const SINGER_SCHEMA = `CREATE TABLE IF NOT EXISTS singer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(40) NOT NULL,
    nacionalidade VARCHAR(40) NOT NULL,
    fk_album INTEGER,
    FOREIGN KEY(fk_album) REFERENCES album(id)
)`

const ALBUM_SCHEMA = `CREATE TABLE IF NOT EXISTS album (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(40) NOT NULL,
    fk_singer INTEGER,
    fk_music INTEGER,
    FOREIGN KEY(fk_music) REFERENCES music(id),
    FOREIGN KEY(fk_singer) REFERENCES singer(id)
)` 

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(MUSIC_SCHEMA);
    db.run(SINGER_SCHEMA);
    db.run(ALBUM_SCHEMA);

    db.each('SELECT * from user', (err, user) => {
        console.log('Users');
        console.log(user);
    })

    db.each('SELECT * from music', (err, music) => {
        console.log('Musics');
        console.log(music);
    })

    db.each('SELECT * from singer', (err, singer) => {
        console.log('Singers');
        console.log(singer);
    })

    db.each('SELECT * from album', (err, album) => {
        console.log('Albums');
        console.log(album);
    })

});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db