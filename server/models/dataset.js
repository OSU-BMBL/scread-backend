import db from '@server/config/db.js'
// the schema directory can only access from ../
const schema = '../schema/dataset.js'

const screadDb = db.scread

// use sequelize to import table structure
const dataset = screadDb.import(schema)

const getDatasets = async function() {
  const allDataset = await dataset.findAll({
    order: screadDb.col('data_id')
  })
  return allDataset
}

const getDataset = async function(id) {
  const allDataset = await dataset.findAll({
    where: {
      data_id: id
    }
  })
  return allDataset
}

const getExperiment = async function(id) {
  const allDataset = await dataset.findAll({
    where: {
      data_id: id
    }
  })
  return allDataset
}

export default {
  // will used in controller
  getDataset,
  getDatasets,
  getExperiment
}
