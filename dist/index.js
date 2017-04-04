'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listen;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dbg = (0, _debug2.default)('metalsmith-http-run');

let params;
function listen(..._params) {
  params = _params;
  _http2.default.createServer(_handler).listen(3030, () => dbg('listening on 3030'));
}
function _handler(request, response) {
  if (request.url !== '/build') return;
  dbg('request', request);
  const process = (0, _child_process.execFile)('node', [module.parent.filename].concat(params));
  process.on('exit', code => {
    response.write(`build exited with code: ${ code }`);
    response.end();
  });
  process.stdout.on('data', data => {
    response.write(data.toString());
    console.log(data.toString());
  });
  process.stderr.on('data', data => {
    response.write(data.toString());
    console.log(data.toString());
  });
}