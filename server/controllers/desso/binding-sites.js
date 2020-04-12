import motif from '@server/models/desso/binding-sites.js'

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

// export methods and use in router
export default {
  getBindingSitesInfo
}
