import motif from '@server/models/desso/frequency-matrix.js'

const getFrequncyMatrixInfo = async function(ctx) {
  const id = ctx.params.id
  const result = await motif.getFrequencyMatrixById(id)
  ctx.body = result
}

// export methods and use in router
export default {
  getFrequncyMatrixInfo
}
