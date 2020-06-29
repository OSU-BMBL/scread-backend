import motif from '@server/models/desso/dataset-annotation.js'

const getOtherInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getOtherInfoById(id)
  ctx.body = result
}

// export methods and use in router
export default {
  getOtherInfo
}
