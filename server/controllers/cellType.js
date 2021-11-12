import ct from '@server/models/cellType.js'

const getCellType = async function(ctx) {
  let id = ctx.params.id
  const result = await ct.getCellTypeById(id)
  ctx.body = result
}

const getCellTypeList = async function(ctx) {
  const result = await ct.getCellTypeList()
  ctx.body = result
}

export default {
  getCellType,
  getCellTypeList
}
