// create a .env file and set the port, database username & password in it, check dotenv website for details.
import dotenv from 'dotenv'
import Koa from 'koa'
import koaRouter from 'koa-router'
import Cors from '@koa/cors'
import { ApolloServer, gql } from 'apollo-server-koa'
import DessoRoute from '@server/routes/desso/router.js'
//import path from 'path'
import consola from 'consola'

dotenv.config()

const app = new Koa()
const router = koaRouter()

const port = process.env.PORT

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}
const server = new ApolloServer({ typeDefs, resolvers })
//server.applyMiddleware({ app })

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
app.use(server.getMiddleware())
export default app.listen(port, () => {
  consola.success(`Koa is listening in port: ${port}`)
})
