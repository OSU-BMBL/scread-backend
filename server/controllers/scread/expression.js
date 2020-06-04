import expression from '@server/models/scread/expression.js'

const getExpressionTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const other = ctx.request.query
  const result = await expression.getExprById(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

// export methods and use in router
export default {
  getExpressionTable
}
