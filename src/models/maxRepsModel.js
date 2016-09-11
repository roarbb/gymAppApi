import User from './user'

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
      })
    })
  },

  insert(db, body) {
    return new Promise((resolve, reject) => {
      const {userHash, name, weight} = body

      User.getByHash(db, userHash)
        .then(userData => {

          const insertData = {
            user_id: userData.id,
            discipline: name,
            max: weight
          }

          db.query('INSERT INTO max_reps SET ?', insertData, (err, result) => {
            if (err) reject(err)

            resolve(result.insertId)
          })
        })
    })
  },

  update(db, body) {
    return new Promise((resolve, reject) => {
      const {maxId, userHash, name, weight} = body

      User.getByHash(db, userHash)
        .then(userData => {

          db.query(
            'UPDATE max_reps SET ? WHERE ? AND ?',
            [{discipline: name, max: weight}, {id: maxId}, {user_id: userData.id}],
            (err, result) => {
              if (err) reject(err)

              resolve(result)
            })
        })
    })
  }

}

export default MaxRepsModel
