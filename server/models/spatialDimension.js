import db from '@server/config/db.js'
import { Op } from 'sequelize'
import _ from 'lodash'
// the schema directory can only access from ../
const schema = '../schema/spot_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const dimension = screadDb.import(schema)

const getSpatialDimensionById = async function(id) {
  // note is is async function and async statement
  let result = await dimension.findAll({
    // use await control async process, return data from Promise object
    // order: screadDb.literal('rand()'),
    where: {
      data_id: id,
      subcluster: 'all'
    }
    // attributes: ['umap_1', 'umap_2', 'cell_type', 'cell_name', 'subcluster']
    // order: 'random()',
  })

  return result // return data
}

export default {
  getSpatialDimensionById
}
