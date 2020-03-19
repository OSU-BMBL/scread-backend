import db from '../config/db.js'
const motifModel = '../schema/matrix.js'
const MotifDb = db.desso

// use sequelize to import table structure
const Motif = MotifDb.import(motifModel)

const getMotifById = async function(id) {
  // note is is async function and async statement
  const motifInfo = await Motif.findOne({
    // use await control async process, return data from Promise object
    where: {
      base_id: id
    }
  })

  return motifInfo // return data
}

const getMotifs = async function() {
  // note is is async function and async statement
  const motifInfo = await Motif.findAll()

  return motifInfo // return data
}

export default {
  // will used in controller
  getMotifById,
  getMotifs
}
