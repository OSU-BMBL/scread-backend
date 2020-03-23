import motif from '../models/motif.js'

const getDatasetInfo = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await motif.getDatasetById(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

const listDatasetInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getDatasets()
  ctx.body = result
}

const getBindingSitesInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getBindingSitesById(id)
  ctx.body = result
}

const getFrequncyMatrixInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getFrequencyMatrixById(id)
  ctx.body = result
}

// export methods and use in router
export default {
  getDatasetInfo,
  listDatasetInfo,
  getBindingSitesInfo,
  getFrequncyMatrixInfo
}
