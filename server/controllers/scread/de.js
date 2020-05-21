import de from '@server/models/scread/de.js'

const getDeTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await de.getDeTableById(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

// export methods and use in router
export default {
  getDeTable
}
