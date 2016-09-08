import {decrypt, generateRandomHash} from '../lib/util'

const User = {

  getAll(db) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user'

       db.query(sql, (err, rows) => {
        if (err) reject(err);
        resolve(rows)
      });
    });
  },

  getByAesHash(db, id) {
    return new Promise((resolve, reject) => {
      const email = decrypt(id);
      const sql = `SELECT * FROM user WHERE email = '${email}' LIMIT 1`

      db.query(sql, (err, rows) => {
      if (err) reject(err)

      if (rows.length === 0) {
        resolve(this.createNewUser(db, email))
        return true
      }

      resolve(rows[0])
      });
    });
  },

  createNewUser(db, email) {
    return new Promise((resolve, reject) => {
      const hash = generateRandomHash()
      const data = {hash, email}

      db.query('INSERT INTO user SET ?', data, (err, result) => {
        if (err) reject(err)

        resolve({
          id: result.insertId,
          email,
          hash
        })
      })

    })
  }

}

export default User;
