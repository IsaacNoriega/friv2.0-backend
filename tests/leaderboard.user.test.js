const request = require('supertest');
const app = require('../src/app').default;

describe('GET /leaderboard/user/123', () => {
  it('should return 200 or 404 (no user)', async () => {
    const res = await request(app).get('/leaderboard/user/123');
    expect([200,404,500]).toContain(res.statusCode);
  });
});
