const request = require('supertest');
const app = require('../server');

describe('express server', () => {
  it('serves index.html at /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Hello from Node');
  });
});
