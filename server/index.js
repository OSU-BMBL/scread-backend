// create a .env file and set the port, database username & password in it, check dotenv website for details.
import dotenv from 'dotenv'
import Koa from 'koa'
import koaRouter from 'koa-router'
import Cors from '@koa/cors'
import DessoRoute from './routes/DessoRoute.js'
//import path from 'path'
import consola from 'consola'

dotenv.config()

const app = new Koa()
const router = koaRouter()

const port = process.env.PORT

app.use(async function(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  consola.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function(err, ctx) {
  console.log('server error', err)
})

router.use('/api/desso', DessoRoute.routes())
app.use(Cors())
app.use(router.routes())

export default app.listen(port, () => {
  consola.success(`Koa is listening in port: ${port}`)
})
