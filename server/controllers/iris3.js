import iris3 from '@server/models/iris3.js'

const getRegulonTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const other = ctx.request.query
  const result = await iris3.getRegulonById(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

// export methods and use in router
export default {
  getRegulonTable
}
