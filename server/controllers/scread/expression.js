import expression from '@server/models/scread/expression.js'

const getExpressionTable = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await expression.getExprById(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

const getExpressionGenes = async function(ctx) {
  const id = ctx.params.id // get id from context url
  const result = await expression.getExprGenes(id) // return query results using await function instead of a promise
  ctx.body = result // store result in context body part
}

const getExpressionByLine = async function(ctx) {
  const nthline = require('nthline')
  const id = ctx.params.id // get id from context url
  const gene = ctx.params.gene
  const filePath = __dirname + '/../../../data/' + id + '_expr.txt'
  // const rowNumber = 42

  const row = await expression.getRowById(id, gene)
  const rowNumber = row.dataValues.row
  console.log(rowNumber)
  const line2 = await nthline(rowNumber, filePath).then((line) =>
    // JSON.stringify(line)
    line.split('\t')
  )
  // return gene line from database
  ctx.body = line2 // store result in context body part
}

// export methods and use in router
export default {
  getExpressionTable,
  getExpressionGenes,
  getExpressionByLine
}
