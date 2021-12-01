const { spawn } = require('child_process')
const id = 'AD00603'
const gene = 'Gad1'
const scriptPath = __dirname + '/../../data/GetExpressionByIdAndGene.py'
const args = {
  args: [id, gene]
}

const process = spawn('python', [scriptPath, id, gene])

// Takes stdout data from script which executed
// with arguments and send this data to res object
process.stdout.on('data', function(data) {
  console.log(data.toString().split(' '))
})
