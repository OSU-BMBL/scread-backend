import motif from '../models/motif.js'

const getMotifInfoById = async function(ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await motif.getMotifById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const getMotifsInfo = async function(ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await motif.getMotifs() // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const getTfbsById = async function(ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await motif.getMotifDetails(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

export default {
  getMotifInfoById,
  getMotifsInfo,
  getTfbsById
  // 导出getMotifInfo的方法，将会在controller里调用
}
