import db from '@server/config/db.js'
// the schema directory can only access from ../../
const schema = '../../schema/cell_type_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const ct = screadDb.import(schema)
const getCellTypeById = async function(id, type) {
  // note is is async function and async statement
  const result = await ct.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    },
    attributes: ['data_id', 'cell_type']
  })
  return result // return data
}

export default {
  // will used in controller
  getCellTypeById
}
