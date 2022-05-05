import dataset from '@server/models/dataset_v2.js'

const getDatasetTable = async function(ctx) {
  const result = await dataset.getDatasets()
  ctx.body = result
}

const getDatasetTable2 = async function(ctx) {
  const result = await dataset.getDatasets2()
  ctx.body = result
}

const getDatasetById = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await dataset.getDataset(id) // return query results using await function instead of a promise
  ctx.body = result
}

const getSameExperimentById = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await dataset.getExperiment(id) // return query results using await function instead of a promise
  ctx.body = result
}

const getAllRegions = async function(ctx) {
  // const result = ['test']// await dataset.getRegions()
  const result = await dataset.getRegions()
  ctx.body = result
}

const getDataIds = async function(ctx) {
  let q = ctx.request.query
  const result = await dataset.getDataIds(q.region, q.species, q.control)
  ctx.body = result
}
// export methods and use in router
export default {
  getDatasetTable,
  getDatasetTable2,
  getDatasetById,
  getSameExperimentById,
  getDataIds,
  getAllRegions
}
