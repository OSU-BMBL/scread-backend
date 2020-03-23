import api from '../controllers/motif.js'
import koaRouter from 'koa-router'

const router = koaRouter()
router.get('/desso/data-info', api.listDatasetInfo)
router.get('/desso/data-info/:id', api.getDatasetInfo)
router.get('/desso/binding-sites/:id', api.getBindingSitesInfo)
router.get('/desso/matrix/:id', api.getFrequncyMatrixInfo)

export default router
