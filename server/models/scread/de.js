import db from '@server/config/scread/db.js'
// the schema directory can only access from ../../
const schema = '../../schema/scread/de.js'

const screadDb = db.scread

// use sequelize to import table structure
const de = screadDb.import(schema)
const getDeTableById = async function(id) {
  // note is is async function and async statement
  const datasetInfo = await de.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    },
    order: screadDb.col('p_val_adj')
  })
  return datasetInfo // return data
}

const getDatasets = async function() {
  const allInfo = await Dataset.findAll()
  return allInfo
}

export default {
  // will used in controller
  getDeTableById,
  getDatasets
}
