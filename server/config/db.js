// DB_USER=root
// DB_URL=127.0.0.1
// DB_PASSWORD=123456

// First step:
// sequelize-auto -o "./server/schema/scread_v1" -d scread_v1 -h YOUR_DB_HOST -u YOUR_USERNAME -p 3306 -x YOUR_PASSWORD -e mysql

import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const screadV2 = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env
    .DB_URL || 'localhost'}/scread_v2`,
  {
    define: {
      timestamps: false
    }
  }
)
const screadV1 = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env
    .DB_URL || 'localhost'}/scread_v1`,
  {
    define: {
      timestamps: false
    }
  }
)

export default {
  screadV2,
  screadV1
}
