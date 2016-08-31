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

  getById(db, id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM user WHERE email = '${id}'`
       db.query(sql, (err, rows) => {
        if (err) reject(err)

        resolve(rows[0])
      });
    });
  }

}

export default User;
