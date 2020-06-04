import db from '@server/config/scread/db.js'
// the schema directory can only access from ../../
const deSchema = '../../schema/scread/de.js'
const deMetaSchema = '../../schema/scread/de_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const de = screadDb.import(deSchema)
const deMeta = screadDb.import(deMetaSchema)
const getDeTableById = async function(id, other) {
  // note is is async function and async statement
  const result = await de.findAndCountAll({
    // use await control async process, return data from Promise object
    where: {
      a_data_id: id,
      b_data_id: other.second_id,
      ct: other.ct,
      type: other.type
    },
    attributes: ['avg_logFC', 'p_val_adj', 'gene'],
    limit: 5000,
    order: screadDb.col('p_val_adj')
  })
  return result // return data
}

const getDeTypeById = async function(id) {
  // note is is async function and async statement
  const result = await deMeta.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    }
  })
  return result // return data
}

export default {
  // will used in controller
  getDeTableById,
  getDeTypeById
}
