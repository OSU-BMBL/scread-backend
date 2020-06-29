import ct from '@server/models/scread/cellType.js'

const getCellType = async function(ctx) {
  let id = ctx.params.id
  const result = await ct.getCellTypeById(id)
  ctx.body = result
}

export default {
  getCellType
}
