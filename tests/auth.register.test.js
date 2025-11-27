const request = require('supertest');
const app = require('../src/app').default;

describe('POST /auth/register', () => {
  it('should fail with missing data', async () => {
    const res = await request(app).post('/auth/register').send({});
    expect([400,422,500]).toContain(res.statusCode);
  }, 10000);
});
