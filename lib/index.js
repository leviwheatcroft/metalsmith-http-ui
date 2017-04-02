// import {
//   compact,
//   extend,
//   each,
//   map,
//   keys,
//   filter,
//   zipObject
// } from 'lodash'
import debug from 'debug'
// import vow from 'vow'
import http from 'http'
import { execFile } from 'child_process'

const dbg = debug('metalsmith-http-run')

export default function listen () {
  http.createServer(_handler)
  .listen(3030, () => dbg('listening on 3030'))
}
function _handler (request, response) {
  if (request.url !== '/build') return
  dbg('request', request)
  const process = execFile('node', [module.parent.filename, 'serve'])
  process.on('exit', (code) => {
    response.write(`build exited with code: ${code}`)
    response.end()
  })
  process.stdout.on('data', (data) => {
    response.write(data.toString())
    console.log(data.toString())
  })
  process.stderr.on('data', (data) => {
    response.write(data.toString())
    console.log(data.toString())
  })
}
