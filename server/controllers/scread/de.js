import de from '@server/models/scread/de.js'

const getDeTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const other = ctx.request.query
  const result = await de.getDeTableById(id, other) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

const getDeType = async function(ctx) {
  const id = ctx.params.id
  const result = await de.getDeTypeById(id)
  ctx.body = result
}

// export methods and use in router
export default {
  getDeTable,
  getDeType
}
