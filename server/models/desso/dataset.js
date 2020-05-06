import db from '@server/config/desso/db.js'
// the schema directory can only access from ../../
const datasetSchema = '../../schema/desso/dataset.js'

const DessoDb = db.desso

// use sequelize to import table structure
const Dataset = DessoDb.import(datasetSchema)
const getDatasetById = async function(id) {
  // note is is async function and async statement
  const datasetInfo = await Dataset.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    },
    order: DessoDb.col('base_id')
  })
  return datasetInfo // return data
}

const getDatasets = async function() {
  const allInfo = await Dataset.findAll()
  return allInfo
}

export default {
  // will used in controller
  getDatasetById,
  getDatasets
}
