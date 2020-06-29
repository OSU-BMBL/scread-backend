import BindingSites from '@server/controllers/desso/binding-sites.js'
import Dataset from '@server/controllers/desso/dataset.js'
import Matrix from '@server/controllers/desso/frequency-matrix.js'
import DatasetAnnotation from '@server/controllers/desso/dataset-annotation.js'

import KoaRouter from 'koa-router'

const router = KoaRouter()

// Dataset table
router.get('/info', Dataset.listDatasetInfo)
router.get('/info/:id', Dataset.getDatasetInfo)

// Dataset annotation table
router.get('/info/:id/annotation', DatasetAnnotation.getOtherInfo)

// Binding sites table (TFBS)
router.get('/sites/:id', BindingSites.getBindingSitesInfo)

// Position frequency matrix table (TFBS)
router.get('/matrix/:id', Matrix.getFrequncyMatrixInfo)

export default router
