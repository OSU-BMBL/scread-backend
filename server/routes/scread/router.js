import de from '@server/controllers/scread/de.js'
import dataset from '@server/controllers/scread/dataset.js'
import dimension from '@server/controllers/scread/dimension.js'
import expression from '@server/controllers/scread/expression.js'
import iris3 from '@server/controllers/scread/iris3.js'

import KoaRouter from 'koa-router'

const router = KoaRouter()

router.get('/de/:id', de.getDeTable)
router.get('/de/:id/meta', de.getDeType)
router.get('/dataset', dataset.getDatasetTable)
router.get('/dataset/:id', dataset.getDatasetById)
router.get('/dimension/:id', dimension.getDimensionTable)
router.get('/expression/:id', expression.getExpressionTable)
router.get('/regulon/:id', iris3.getRegulonTable)

export default router
