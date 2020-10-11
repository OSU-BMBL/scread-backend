import db from '@server/config/db.js'
import { Op } from 'sequelize'
// the schema directory can only access from ../../
const schema = '../../schema/cell_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const dimension = screadDb.import(schema)
const getAllDimensionById = async function(id, type) {
  // note is is async function and async statement
  const result = await dimension.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id,
      subcluster: type
    },
    attributes: ['umap_1', 'umap_2', 'cell_type', 'cell_name', 'subcluster'],
    limit: 30000
  })
  return result // return data
}

const getSubclusterDimensionByIdAndType = async function(id, type) {
  // note is is async function and async statement
  const result = await dimension.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id,
      cell_type: type,
      subcluster: {
        [Op.not]: 'all'
      }
    },
    attributes: ['umap_1', 'umap_2', 'cell_type', 'cell_name', 'subcluster'],
    limit: 30000
  })
  return result // return data
}

export default {
  // will used in controller
  getAllDimensionById,
  getSubclusterDimensionByIdAndType
}
