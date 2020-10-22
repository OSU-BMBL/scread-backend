import dataset from '@server/models/dataset.js'

const getDatasetTable = async function(ctx) {
  const result = await dataset.getDatasets()
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

// export methods and use in router
export default {
  getDatasetTable,
  getDatasetById,
  getSameExperimentById
}
