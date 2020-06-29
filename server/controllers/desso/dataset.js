import motif from '@server/models/desso/dataset.js'

const getDatasetInfo = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await motif.getDatasetById(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

const listDatasetInfo = async function(ctx) {
  const result = await motif.getDatasets()
  ctx.body = result
}

// export methods and use in router
export default {
  getDatasetInfo,
  listDatasetInfo
}
