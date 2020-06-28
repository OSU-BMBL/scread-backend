import de from '@server/controllers/scread/de.js'
import dataset from '@server/controllers/scread/dataset.js'
import dimension from '@server/controllers/scread/dimension.js'
import expression from '@server/controllers/scread/expression.js'
import iris3 from '@server/controllers/scread/iris3.js'
import publication from '@server/controllers/scread/publication.js'
import cellType from '@server/controllers/scread/cellType.js'
import upload from '@server/controllers/scread/upload.js'

import KoaRouter from 'koa-router'

const router = KoaRouter()

router.get('/de/:id', de.getDeTable)
router.get('/de/:id/meta', de.getDeType)
router.get('/dataset', dataset.getDatasetTable)
router.get('/dataset/:id', dataset.getDatasetById)
router.get('/dimension/:id/type/:type', dimension.getDimensionTable)
router.get('/expression/:gene/id/:id', expression.getExpressionByLine)
router.get('/expression_genes/:id', expression.getExpressionGenes)
router.get('/regulon/:id', iris3.getRegulonTable)
router.get('/publication/:id', publication.getPublicationById)
router.get('/celltype/:id', cellType.getCellType)
router.post('/upload', upload.submitFiles)

export default router
