import db from '@server/config/db.js'
// the schema directory can only access from ../
const schema = '../schema/dataset.js'
import Sequelize from 'sequelize'
const screadDb = db.scread
// use sequelize to import table structure
const dataset = screadDb.import(schema)

const getDatasets = async function() {
  const allDataset = await dataset.findAll({
    order: screadDb.col('data_id')
  })
  return allDataset
}

const getDataset = async function(id) {
  const allDataset = await dataset.findAll({
    where: {
      data_id: id
    }
  })
  return allDataset
}

const getExperiment = async function(id) {
  const allDataset = await dataset.findAll({
    where: {
      data_id: id
    }
  })
  return allDataset
}

const getRegions = async function() {
  const allRegions = await dataset.findAll({
    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('region')), 'region']
  })
  // also aggregate('region', 'DISTINCT', { plain: false })
  const distinctRegions = allRegions.map((r) => r['region'])
  return distinctRegions
}

const getDataIds = async function(region, species, condition) {
  const filter = {
    region: region,
    species: species
  }
  if (condition !== undefined) {
    filter.condition = condition
  }
  let allDataIds = await dataset.findAll({
    where: filter,
    attributes: ['data_id']
  })
  allDataIds = allDataIds.map((r) => r.data_id)
  return allDataIds
}

export default {
  // will used in controller
  getDataset,
  getDatasets,
  getExperiment,
  getDataIds,
  getRegions
}
