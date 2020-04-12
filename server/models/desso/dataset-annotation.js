import db from '@server/config/desso/db.js'
// the schema directory can only access from ../../
const otherInfoModel = '../../schema/desso/dataset_info.js'

const DessoDb = db.desso

// use sequelize to import table structure
const OtherInfo = DessoDb.import(otherInfoModel)

const getOtherInfoById = async function(id) {
  const otherInfo = await OtherInfo.findAll({
    where: {
      dataset_id: id
    }
  })
  return otherInfo // return data
}

export default {
  // will used in controller
  getOtherInfoById
}
