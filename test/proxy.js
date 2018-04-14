'use strict';
const http = require('http')
const net = require('net')
const getPort = require('get-port')
const pify = require('pify')

const onConnect = (remoteHost, port) => (req, socket, head) => {
  const s = net.connect(port, remoteHost, () => {
    socket.write('HTTP/1.1 200 Connection established\r\n\r\n');
    socket.pipe(s);
    s.write(head);
    s.pipe(socket);
  });

  s.on('end', () => socket.end());
};


const createProxy = (remoteHost, remotePort, opts) => getPort().then(port => {
  const protocol = 'http';
  const p = http.createServer(opts, () => {});

  p.host = 'localhost';
  p.port = port;
  p.url = `${protocol}://${p.host}:${port}`;
  p.protocol = protocol;
  p.listen = pify(p.listen);
    p.close = pify(p.close);
    
  p.on('connect', onConnect(remoteHost, remotePort));
  p.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  return p;
});


const setProxyEnv = (proxy) => {
  process.env.https_proxy = proxy
  process.env.HTTPS_PROXY = proxy
}

const exportProxyEnv = () => {
  return {
    'https': process.env.https_proxy,
    'HTTPS': process.env.HTTPS_PROXY
  }
}

const restoreProxyEnv = (backup) => {
  process.env.https_proxy = backup['https']
  process.env.HTTPS_PROXY = backup['HTTPS']
}


module.exports = {
  createProxy,
  exportProxyEnv,
  setProxyEnv,
  restoreProxyEnv
}
