import db from '@server/config/scread/db.js'
// the schema directory can only access from ../../
const schema = '../../schema/scread/cell_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const dimension = screadDb.import(schema)
const getDimensionById = async function(id) {
  // note is is async function and async statement
  const result = await dimension.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    },
    limit: 10000
  })
  return result // return data
}

export default {
  // will used in controller
  getDimensionById
}
