import publication from '@server/models/publication_v2.js'

const getPublicationById = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await publication.getPublication(id) // return query results using await function instead of a promise
  ctx.body = result
}

// export methods and use in router
export default {
  getPublicationById
}
