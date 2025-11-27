const request = require('supertest');
const app = require('../src/app').default;

describe('GET /auth/login-failed', () => {
  it('should return 401 and error message', async () => {
    const res = await request(app).get('/auth/login-failed');
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: 'Google authentication failed' });
  });
});
