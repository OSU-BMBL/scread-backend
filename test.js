const axios = require('axios')

async function makePostRequest() {
  let res = await axios.post('https://amp.pharm.mssm.edu/Enrichr/addList')

  console.log(`Status code: ${res.status}`)
  console.log(`Status text: ${res.statusText}`)
  console.log(`Request method: ${res.request.method}`)
  console.log(`Path: ${res.request.path}`)

  console.log(`Date: ${res.headers.date}`)
  console.log(`Data: ${res.data}`)
}

makePostRequest()
