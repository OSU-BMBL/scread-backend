import db from '@server/config/scread/db.js'
// the schema directory can only access from ../../
const schema = '../../schema/scread/expression.js'

const screadDb = db.scread

// use sequelize to import table structure
const expression = screadDb.import(schema)
const getExprById = async function(id) {
  // note is is async function and async statement
  const result = await expression.findAll({
    // use await control async process, return data from Promise object
    where: {
      gene: id
    },
    attributes: ['expression'],
    limit: 10000
  })
  return result // return data
}

export default {
  // will used in controller
  getExprById
}
