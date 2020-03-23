import db from '../config/db.js'
const datasetModel = '../schema/Desso/dataset.js'
const bindingSitesModel = '../schema/Desso/tfbs_data.js'
const frequencyMatrixModel = '../schema/Desso/matrix_data.js'
const DessoDb = db.desso

// use sequelize to import table structure
const Dataset = DessoDb.import(datasetModel)
const BindingSites = DessoDb.import(bindingSitesModel)
const FrequencyMatrix = DessoDb.import(frequencyMatrixModel)

const getDatasetById = async function(id) {
  // note is is async function and async statement
  const datasetInfo = await Dataset.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    }
  })
  return datasetInfo // return data
}

const getDatasets = async function() {
  const allInfo = await Dataset.findAll()
  return allInfo
}

const getBindingSitesById = async function(id) {
  const bingdingSites = await BindingSites.findAll({
    where: {
      base_id: id
    }
  })
  return bingdingSites
}

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
  getDatasetById,
  getDatasets,
  getBindingSitesById,
  getFrequencyMatrixById
}
