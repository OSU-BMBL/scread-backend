// create a .env file and set the port, database username & password in it, check dotenv website for details.

import Koa from 'koa'
import koaRouter from 'koa-router'
import path from 'path'
import consola from 'consola'
import dotenv from 'dotenv'
dotenv.config()

const app = new Koa()

let port = process.env.PORT

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})
consola.log(port)
export default app.listen(port, () => {
  consola.success(`Koa is listening in port: ${port}`)
})
