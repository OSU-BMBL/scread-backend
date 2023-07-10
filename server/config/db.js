// First step: enter ./server run command:
// sequelize-auto -o "./schema/" -d scread -h 127.0.0.1 -u cankun -p 3306 -x 19950620 -e mysql
// DB_USER=root
// DB_URL=127.0.0.1
// DB_PASSWORD=19950620
// PORT=8889

import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.DB_URL)
const scread = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env
    .DB_URL || 'localhost'}/ssread`,
  {
    define: {
      timestamps: false //stop auto adding timestamp to database
    }
  }
)

export default {
  scread // export database api to Models
}
