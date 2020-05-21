import de from '@server/controllers/scread/de.js'

import KoaRouter from 'koa-router'

const router = KoaRouter()

// Dataset table
router.get('/de/:id', de.getDeTable)

export default router
