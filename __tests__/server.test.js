const request = require('supertest');
const express = require('express');
const path = require('path');

// Recreate the app as defined in server.js
const app = express();
app.use(express.static(path.join(__dirname, '..', 'static')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
});

describe('GET /', () => {
  it('responds with the index page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Welcome to SimpleAgentCodex');
  });
});
