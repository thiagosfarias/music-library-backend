const albumConverter = row => ({
    id: row.id,
    name: row.title,
});

class AlbumDao {
    constructor(db) {
        this._db = db;
    }

    findByName(title) {

        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM album WHERE title = ?`,
            [title],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find album');
                }
                 
                if(row) resolve(albumConverter(row));
                resolve(null);
            }
        ));
    }

    findAlbuns(){
        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM album`,
            [album],
            (err, row) => {
                if(err) {
                    console.log(err);
                    return reject('Cant find the albuns');
                }
                if(row) resolve(albumConverter(row));
                resolve(null);
            }
        ))
    }
    
    




}

module.exports = AlbumDao;