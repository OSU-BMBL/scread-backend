import api from '../controllers/motif.js'
import koaRouter from 'koa-router'

const router = koaRouter()
router.get('/desso/matrix', api.getMotifsInfo)
router.get('/desso/matrix/:id', api.getMotifInfoById)

export default router
