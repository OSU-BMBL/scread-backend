import KoaRouter from 'koa-router'

const router = KoaRouter()
router.get('/', (ctx, next) => {
  ctx.body = `Hello,

  You are visiting the API server for scREAD v2.

  scREAD is a single-cell RNA-seq database for Alzheimer's disease, dedicated to collect all existing 
  Human and Mouse Alzheimer's Disease scRNA-Seq data, and provide comprehensive interpretations.

  Frontend GitHub: https://github.com/OSU-BMBL/scread

  Backend GitHub: https://github.com/OSU-BMBL/scread-backend`
})

export default router
