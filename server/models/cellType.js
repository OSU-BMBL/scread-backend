import db from '@server/config/db.js'
import Sequelize from 'sequelize'
// the schema directory can only access from ../
const schema = '../schema/cell_type_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const ct = screadDb.import(schema)
const getCellTypeById = async function (id, type) {
  // note is is async function and async statement
  const result = await ct.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    },
    attributes: ['data_id', 'cell_type', 'subcluster']
  })
  return result // return data
}

const getCellTypeList = async function () {
  let result = await ct.findAll({
    attributes: [
      Sequelize.fn('DISTINCT', Sequelize.col('cell_type')), 'cell_type'
    ]
  })
  result = result.reduce((map, obj) => {
    let s = ""
    if (obj.cell_type == "Oligodendrocyte precursor cells") {
      s = "opc"
    } else if (obj.cell_type == "NK cells") {
      s = "nkc"
    } else {
      s = obj.cell_type.substring(0, 3).toLowerCase()
    }
    map[s] = obj.cell_type
    return map
  }, {});
  return result // return data
}

export default {
  // will used in controller
  getCellTypeById,
  getCellTypeList
}
