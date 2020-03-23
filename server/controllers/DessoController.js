import motif from '../models/DessoModel.js'

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
  if (ctx.request.query.format) {
    // todo: return data by format
    // http://localhost:8889/api/desso/sites/DE00000101?format=jaspar
    console.log(ctx.request.query.format)
  }
  ctx.body = result
}

const getFrequncyMatrixInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getFrequencyMatrixById(id)
  ctx.body = result
}

const getOtherInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getOtherInfoById(id)
  ctx.body = result
}

// export methods and use in router
export default {
  getDatasetInfo,
  listDatasetInfo,
  getBindingSitesInfo,
  getFrequncyMatrixInfo,
  getOtherInfo
}
