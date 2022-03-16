import db from '@server/config/db.js'
// the schema directory can only access from ../
const schema = '../schema/expression.js'

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
    attributes: ['expression', 'cell_name']
  })
  return result // return data
}

const getExprByMultiId = async function(id1, id2) {
  // note is is async function and async statement
  const result = await expression.findAll({
    // use await control async process, return data from Promise object
    where: {
      gene: id1,
      gene: id2
    },
    attributes: ['expression', 'cell_name']
  })
  return result // return data
}

const getExprGenes = async function(id) {
  // note is is async function and async statement
  const result = await expression.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    },
    attributes: ['gene'],
    group: ['gene']
  })
  return result // return data
}

const getRowById = async function(id, gene) {
  // note is is async function and async statement
  const result = await expression.findOne({
    // use await control async process, return data from Promise object
    where: {
      gene: gene,
      data_id: id
    },
    attributes: ['row']
  })
  return result // return data
}

export default {
  // will used in controller
  getExprById,
  getExprGenes,
  getRowById,
  getExprByMultiId
}
