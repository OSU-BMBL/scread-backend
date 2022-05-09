import de from '@server/models/v1/de.js'

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

const getAllDeType = async function(ctx) {
  const result = await de.getAllDeType()
  ctx.body = result
}
const getDeGene = async function(ctx) {
  const id = ctx.params.id
  const result = await de.getDeGeneByName(id)
  ctx.body = result
}

const getControlledIds = async function(ctx) {
  const id = ctx.params.id
  const result = await de.getControlledIds(id)
  ctx.body = result
}

const getOverlap = async function(ctx) {
  let q = ctx.request.query
  const top = parseInt(q.top)
  const threshold = parseInt(q.threshold)
  const result = await de.getOverlap(
    q.region,
    q.species,
    top,
    threshold,
    q.direction
  )
  ctx.body = result
}

// export methods and use in router
export default {
  getDeTable,
  getDeType,
  getDeGene,
  getAllDeType,
  getControlledIds,
  getOverlap
}
