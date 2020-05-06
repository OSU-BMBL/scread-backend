import db from '@server/config/desso/db.js'
// the schema directory can only access from ../../
const otherInfoSchema = '../../schema/desso/dataset_info.js'
const { Op } = require('sequelize')
const DessoDb = db.desso

// use sequelize to import table structure
const OtherInfo = DessoDb.import(otherInfoSchema)

const getOtherInfoById = async function(id) {
  const otherInfo = await OtherInfo.findAll({
    where: {
      dataset_id: id,
      value: {
        [Op.not]: ''
      }
    },
    order: DessoDb.col('key')
  })
  return otherInfo // return data
}

export default {
  // will used in controller
  getOtherInfoById
}
