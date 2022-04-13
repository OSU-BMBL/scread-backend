import dimension from '@server/models/dimension.js'
import spatialDimension from '@server/models/spatialDimension.js'

const getDimensionTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  let type = ctx.params.type
  if (type === 'All cell types') {
    const result = await dimension.getAllDimensionById(id, 'all')
    ctx.body = result
  } else {
    type.replace(/%20/g, ' ')
    const result = await dimension.getSubclusterDimensionByIdAndType(id, type)
    ctx.body = result
  }
  // return query results using await function instead of a promise
  // store result in context body part
}

const getSpatialDimensionTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  let type = ctx.params.type
  const result = await spatialDimension.getSpatialDimensionById(id, 'all')
  ctx.body = result
}

// export methods and use in router
export default {
  getDimensionTable,
  getSpatialDimensionTable
}
