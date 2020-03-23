import api from '../controllers/DessoController.js'
import koaRouter from 'koa-router'

const router = koaRouter()
router.get('/info', api.listDatasetInfo)
router.get('/info/:id', api.getDatasetInfo)
router.get('/info/:id/other', api.getOtherInfo)
router.get('/sites/:id', api.getBindingSitesInfo)
router.get('/matrix/:id', api.getFrequncyMatrixInfo)

export default router
