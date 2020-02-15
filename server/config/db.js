// First step: enter ./server run command sequelize-auto -o "./schema" -d events -h 127.0.0.1 -u root -p 3306 -x YOUR_PASSWORD -e mysql

import Sequelize from 'sequelize'

const Todolist = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/events`,
  {
    define: {
      timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    }
  }
)
