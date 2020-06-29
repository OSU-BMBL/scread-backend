import db from '@server/config/scread/db.js'
// the schema directory can only access from ../../
const schema = '../../schema/scread/publication.js'

const screadDb = db.scread

// use sequelize to import table structure
const publication = screadDb.import(schema)

const getPublication = async function(id) {
  const result = await publication.findAll({
    where: {
      data_id: id
    }
  })
  return result
}

export default {
  // will used in controller
  getPublication
}
