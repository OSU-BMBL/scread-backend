import event from '../models/event.js'

const getEventInfo = async function(ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await event.getEventById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

export default {
  getEventInfo // 导出getEventInfo的方法，将会在controller里调用
}
