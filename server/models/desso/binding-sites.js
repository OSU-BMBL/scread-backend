import db from '@server/config/desso/db.js'
// the schema directory can only access from ../../
const bindingSitesModel = '../../schema/desso/tfbs_data.js'

const DessoDb = db.desso

// use sequelize to import table structure
const BindingSites = DessoDb.import(bindingSitesModel)

const getBindingSitesById = async function(id) {
  const bingdingSites = await BindingSites.findAll({
    where: {
      base_id: id
    }
  })
  return bingdingSites
}

export default {
  // will used in controller
  getBindingSitesById
}
