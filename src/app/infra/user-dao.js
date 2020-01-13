const userConverter = row => ({
    id: row.user_id,
    name: row.user_name,
});

class UserDao {
    constructor(db) {
        this._db = db;
    }

    findByName(userName) {

        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM user WHERE user_name = ?`,
            [userName],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find user');
                }
                 
                if(row) resolve(userConverter(row));
                resolve(null);
            }
        ));
    }


    findByNameAndPassword(userName, password) {
        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM user WHERE user_name = ? AND password = ?`,
            [userName, password],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find user');
                }
                
                if(row) resolve(userConverter(row));
                resolve(null);
            }
        ));
    }

    add(user) {
        return new Promise((resolve, reject) => {
            
            this._db.run(`
                INSERT INTO user (
                    user_name,
                    user_password, 
                ) values (?,?)
            `,
                [
                    user.userName,
                    user.password, 
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t register new user');
                    }
                    console.log(`User ${user.userName} registered!`)
                    resolve();
                });
        });
    }

}

module.exports = UserDao;