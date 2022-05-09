import db from '@server/config/db.js'
import { Op } from 'sequelize'
import _ from 'lodash'
// the schema directory can only access from ../
const schema = '../../schema/scread_v1/cell_meta.js'

const screadDb = db.screadV1

// use sequelize to import table structure
const dimension = screadDb.import(schema)
const getAllDimensionById = async function(id, type) {
  // note is is async function and async statement
  let result = await dimension.findAll({
    // use await control async process, return data from Promise object
    // order: screadDb.literal('rand()'),
    where: {
      data_id: id,
      subcluster: type
    },
    attributes: ['umap_1', 'umap_2', 'cell_type', 'cell_name', 'subcluster']
    // order: 'random()',
  })

  const nCells = result.length

  if (nCells > 8000) {
    const nStep = Math.floor(nCells / 5000)
    const keepIndex = _.range(0, nCells, nStep)
    result = keepIndex.map((i) => result[i])
  }
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
    attributes: ['umap_1', 'umap_2', 'cell_type', 'cell_name', 'subcluster']
  })
  return result // return data
}

export default {
  // will used in controller
  getAllDimensionById,
  getSubclusterDimensionByIdAndType
}
