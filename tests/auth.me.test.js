const request = require('supertest');
const app = require('../src/app').default;

describe('GET /auth/me', () => {
  it('should require authentication', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.statusCode).toBe(401);
  });
});
