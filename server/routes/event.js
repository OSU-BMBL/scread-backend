import api from '../controllers/event.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.get('/event/:id', api.getEventInfo)

export default router
