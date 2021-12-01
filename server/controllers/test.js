let { PythonShell } = require('python-shell')
const { spawn } = require('child_process')
const id = 'AD00603'
const gene = 'Gad1'
const scriptPath = __dirname + '/../../data/GetExpressionByIdAndGene.py'
const args = {
  args: [id, gene]
}

PythonShell.run(scriptPath, args, function(err, results) {
  if (err) throw err
  // results is an array consisting of messages collected during execution
  console.log(results)
})

function call_python(params) {
  const process = spawn('python', [scriptPath, JSON.stringify(params)])
  let collected_chunks = ''
  return new Promise((resolve) => {
    // collect chunks until program completes
    process.stdout.on('data', (data) => {
      collected_chunks += data.toString()
    })
    process.stdout.on('end', () => {
      resolve(collected_chunks)
    })
  })
}

python_process = call_python(args)
python_process.then((result) => {
  res.send(result)
})
