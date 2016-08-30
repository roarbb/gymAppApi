const User = {

  getAll(db) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user'

       db.query(sql, (err, rows) => {
        if (err) reject(err);
        resolve(rows)
      });
    });
  }

}

export default User;
