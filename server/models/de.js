import db from '@server/config/db.js'
import { Op } from 'sequelize'
// the schema directory can only access from ../../
const deSchema = '../schema/de.js'
const deMetaSchema = '../schema/de_meta.js'

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
      cluster: other.ct,
      type: other.type
    },
    attributes: ['avg_logFC', 'p_val_adj', 'pct_1', 'pct_2', 'gene'],
    order: screadDb.col('p_val_adj')
  })

  return result // return data
}

const getSubclusterDeTableById = async function(id, other) {
  // note is is async function and async statement
  const result = await de.findAndCountAll({
    // use await control async process, return data from Promise object
    where: {
      a_data_id: id,
      b_data_id: id,
      ct: other.ct.substring(0, 3).toLowerCase(),
      cluster: other.second_id,
      type: 'subcluster'
    },
    attributes: ['avg_logFC', 'p_val_adj', 'pct_1', 'pct_2', 'gene'],
    order: screadDb.col('p_val_adj')
  })
  return result // return data
}

const getDeTypeById = async function(id) {
  // note is is async function and async statement
  const result = await deMeta.findAll({
    // use await control async process, return data from Promise object
    where: {
      [Op.or]: [{ data_id: id }, { b_data_id: id }]
    }
  })
  return result // return data
}

const getAllDeType = async function(id) {
  // note is is async function and async statement
  const result = await deMeta.findAll()
  return result // return data
}

const getDeGeneByName = async function(id) {
  // note is is async function and async statement
  const result = await de.findAndCountAll({
    // use await control async process, return data from Promise object
    where: {
      gene: id
    }
  })
  return result // return data
}

export default {
  // will used in controller
  getDeTableById,
  getSubclusterDeTableById,
  getDeTypeById,
  getDeGeneByName,
  getAllDeType
}
