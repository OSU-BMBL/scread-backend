import api from '../controllers/DessoController.js'
import koaRouter from 'koa-router'

const router = koaRouter()
router.get('/desso/info', api.listDatasetInfo)
router.get('/desso/info/:id', api.getDatasetInfo)
router.get('/desso/info/:id/other', api.getOtherInfo)
router.get('/desso/sites/:id', api.getBindingSitesInfo)
router.get('/desso/matrix/:id', api.getFrequncyMatrixInfo)

export default router
