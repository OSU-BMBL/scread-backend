import db from '../config/db.js'
const motifModel = '../schema/matrix.js'
const tfbsModel = '../schema/tfbs_data.js'
const MotifDb = db.desso

// use sequelize to import table structure
const Motif = MotifDb.import(motifModel)
const Tfbs = MotifDb.import(tfbsModel)

const getMotifById = async function(id) {
  // note is is async function and async statement
  const motifInfo = await Motif.findAll({
    // use await control async process, return data from Promise object
    where: {
      data_id: id
    }
  })

  return motifInfo // return data
}

const getMotifs = async function() {
  // note is is async function and async statement
  const motifInfo = await Motif.findAll()

  return motifInfo // return data
}

const getMotifDetails = async function(id) {
  const motifDetails = await Tfbs.findAll({
    // use await control async process, return data from Promise object
    where: {
      base_id: id
    }
  })

  return motifDetails // return data
}
export default {
  // will used in controller
  getMotifById,
  getMotifs,
  getMotifDetails
}
