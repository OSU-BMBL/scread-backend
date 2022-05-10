import de from '@server/controllers/v1/de.js'
import dataset from '@server/controllers/v1/dataset.js'
import dimension from '@server/controllers/v1/dimension.js'
import expression from '@server/controllers/v1/expression.js'
import iris3 from '@server/controllers/v1/iris3.js'
import publication from '@server/controllers/v1/publication.js'
import cellType from '@server/controllers/v1/cellType.js'
import upload from '@server/controllers/v1/upload.js'
import KoaRouter from 'koa-router'

const router = KoaRouter()
router.get('/', (ctx, next) => {
  ctx.body = `Hello,

  You are visiting the API server for scREAD v1 (archived).

  scREAD is a single-cell RNA-seq database for Alzheimer's disease, dedicated to collect all existing 
  Human and Mouse Alzheimer's Disease scRNA-Seq data, and provide comprehensive interpretations.

  Frontend GitHub: https://github.com/OSU-BMBL/scread

  Backend GitHub: https://github.com/OSU-BMBL/scread-backend`
})

router.get('/overlap', de.getOverlap)
router.get('/de/:id', de.getDeTable)
router.get('/de/ctrl/:id', de.getControlledIds)
router.get('/de/gene/:id', de.getDeGene)
router.get('/de/:id/meta', de.getDeType)
router.get('/de-type', de.getAllDeType)
router.get('/dataset', dataset.getDatasetTable)
router.get('/dataset/data_ids', dataset.getDataIds)
router.get('/dataset/regions', dataset.getAllRegions)
router.get('/dataset/:id', dataset.getDatasetById)
router.get('/dimension/:id/type/:type', dimension.getDimensionTable)
router.get('/expression/:gene/id/:id', expression.getExpressionByLine)

router.get('/expression/:gene/ids/:ids', expression.getExpressionByLineMulti)
router.get('/expression_genes/:id', expression.getExpressionGenes)
router.get('/expression/:id1/:id2', expression.getExpressionTableMulti)
router.get('/regulon/:id', iris3.getRegulonTable)
router.get('/publication/:id', publication.getPublicationById)
router.get('/celltype', cellType.getCellTypeList)
router.get('/celltype/:id', cellType.getCellType)
router.post('/upload', upload.submitFiles)

export default router
