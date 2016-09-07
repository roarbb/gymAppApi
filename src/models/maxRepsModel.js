const MaxRepsModel = {

  getAll(db, userHash) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT mr.id, mr.discipline, mr.max
        FROM max_reps mr
        LEFT JOIN user u ON u.id = mr.user_id
        WHERE u.hash = "${userHash}"`

       db.query(sql, (err, rows) => {
        if (err) reject(err)
        resolve(rows)
      });
    });
  }

}

export default MaxRepsModel;
