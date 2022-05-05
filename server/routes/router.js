import de from '@server/controllers/de.js'
import dataset from '@server/controllers/dataset.js'
import dimension from '@server/controllers/dimension.js'
import expression from '@server/controllers/expression.js'
import iris3 from '@server/controllers/iris3.js'
import publication from '@server/controllers/publication.js'
import cellType from '@server/controllers/cellType.js'
import upload from '@server/controllers/upload.js'
import KoaRouter from 'koa-router'

import dataset_v2 from '@server/controllers/dataset_v2.js'
import publication_v2 from '@server/controllers/publication_v2.js'

const router = KoaRouter()
router.get('/', (ctx, next) => {
  ctx.body = `Hello,

  You are visiting the API server for scREAD: https://bmbls.bmi.osumc.edu/scread

  scREAD is a single-cell RNA-seq database for Alzheimer’s disease, dedicated to collect all existing 
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
router.get('/dataset2', dataset.getDatasetTable2)
router.get('/dataset/data_ids', dataset.getDataIds)
router.get('/dataset/regions', dataset.getAllRegions)
router.get('/dataset/:id', dataset.getDatasetById)
router.get('/dimension/:id/type/:type', dimension.getDimensionTable)
router.get('/spatial-dimension/:id/', dimension.getSpatialDimensionTable)
router.get('/expression/:gene/id/:id', expression.getExpressionByLine)

router.get('/expression/:gene/ids/:ids', expression.getExpressionByLineMulti)
router.get('/expression_genes/:id', expression.getExpressionGenes)
router.get('/expression/:id1/:id2', expression.getExpressionTableMulti)
router.get('/regulon/:id', iris3.getRegulonTable)
router.get('/publication/:id', publication.getPublicationById)
router.get('/celltype', cellType.getCellTypeList)
router.get('/celltype/:id', cellType.getCellType)
router.post('/upload', upload.submitFiles)

// v2
router.get('/v2/publication/:id', publication_v2.getPublicationById)
router.get('/v2/publication/:id', publication_v2.getPublicationById)
router.get('/v2/dataset', dataset_v2.getDatasetTable)
router.get('/v2/dataset2', dataset_v2.getDatasetTable2)
router.get('/v2/dataset/data_ids', dataset_v2.getDataIds)
router.get('/v2/dataset/regions', dataset_v2.getAllRegions)
router.get('/v2/dataset/:id', dataset_v2.getDatasetById)

export default router
