import expression from '@server/models/expression.js'
import _ from 'lodash'
const getExpressionTable = async function(ctx) {
  const id = ctx.params.id
  const result = await expression.getExprById(id) // return query results using await function instead of a promise
  ctx.body = result
}

const getExpressionGenes = async function(ctx) {
  const id = ctx.params.id
  const result = await expression.getExprGenes(id)
  ctx.body = result
}

const getExpressionByLine = async function(ctx) {
  // Should move business logic to services modules
  const nthline = require('nthline')
  const id = ctx.params.id
  const gene = ctx.params.gene
  const filePath = __dirname + '/../../data/' + id + '_expr.txt'
  const row = await expression.getRowById(id, gene)
  const rowNumber = row.dataValues.row
  const [geneName, ...geneCounts] = await nthline(
    rowNumber,
    filePath
  ).then((line) => line.split('\t'))
  // The expression data are stored in raw counts, add log1p
  const logNormalizeValue = [
    geneName,
    ...geneCounts.map((value) => Math.log1p(value))
  ]

  let result = logNormalizeValue

  const nCells = logNormalizeValue.length
  if (nCells > 8000) {
    const nStep = Math.floor(nCells / 5000)
    // Kepp first gene name
    const keepIndex = [0, ..._.range(1, nCells, nStep)]
    result = keepIndex.map((i) => logNormalizeValue[i])
  }
  console.log(result)
  ctx.body = result
}

const getExpressionByIdAndGene = async function(ctx) {
  const { spawn } = require('child_process')

  const id = ctx.params.id
  const gene = ctx.params.gene
  // const filePath = __dirname + '/../../data/' + id + '_expr.loom'

  // id = 'AD00603'
  // gene = 'Gad1'

  const scriptPath = __dirname + '/../../data/GetExpressionByIdAndGene.py'

  const process = spawn('python', [scriptPath, id, gene])

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function(data) {
    console.log(data.toString())
    ctx.body = data.toString()
  })
}

// export methods and use in router
export default {
  getExpressionTable,
  getExpressionGenes,
  getExpressionByLine,
  getExpressionByIdAndGene
}
