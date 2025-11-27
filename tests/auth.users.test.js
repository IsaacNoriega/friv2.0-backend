const request = require('supertest');
const app = require('../src/app').default;

describe('GET /auth/users', () => {
  it('should require authentication', async () => {
    const res = await request(app).get('/auth/users');
    expect(res.statusCode).toBe(401);
  });
});
