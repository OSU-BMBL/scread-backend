import de from '@server/models/scread/de.js'

const getDeTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  let other = ctx.request.query
  if (other.type === 'subcluster') {
    const result = await de.getSubclusterDeTableById(id, other)
    ctx.body = result
  } else if (other.type === 'cell_type_specific') {
    other.ct.replace(/%20/g, ' ')
    const result = await de.getDeTableById(id, other)
    ctx.body = result
  } else {
    other.ct.substring(0, 2).toLowerCase()
    const result = await de.getDeTableById(id, other)
    ctx.body = result
  }
  // return query results using await function instead of a promise
  // store result in context body part
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
