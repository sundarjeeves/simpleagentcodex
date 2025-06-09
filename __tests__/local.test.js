const http = require('http');
const fs = require('fs');
const { startServer } = require('../local');

describe('local server', () => {
  let server;

  afterEach((done) => {
    if (server && server.close) {
      server.close(done);
    } else {
      done();
    }
  });

  it('reads files using fs.readFile', (done) => {
    jest.spyOn(fs, 'readFile').mockImplementation((path, cb) => cb(null, Buffer.from('mocked')));
    server = startServer(0);
    server.on('listening', () => {
      const port = server.address().port;
      http.get({ hostname: 'localhost', port, path: '/' }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          expect(data).toBe('mocked');
          expect(fs.readFile).toHaveBeenCalled();
          fs.readFile.mockRestore();
          done();
        });
      });
    });
  });

  it('logs start message', (done) => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    server = startServer(0);
    server.on('listening', () => {
      expect(logSpy).toHaveBeenCalled();
      logSpy.mockRestore();
      done();
    });
  });
});
