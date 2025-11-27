const request = require('supertest');
const app = require('../src/app').default;

describe('POST /auth/login', () => {
  it('should fail with missing data', async () => {
    const res = await request(app).post('/auth/login').send({});
    expect([400,401,422]).toContain(res.statusCode);
  });
});
