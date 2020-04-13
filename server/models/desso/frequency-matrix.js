import db from '@server/config/desso/db.js'
// the schema directory can only access from ../../
const frequencyMatrixSchema = '../../schema/desso/matrix_data.js'

const DessoDb = db.desso

// use sequelize to import table structure
const FrequencyMatrix = DessoDb.import(frequencyMatrixSchema)

const getFrequencyMatrixById = async function(id) {
  const frequencyMatrix = await FrequencyMatrix.findAll({
    where: {
      base_id: id
    }
  })
  return frequencyMatrix // return data
}

export default {
  // will used in controller
  getFrequencyMatrixById
}
