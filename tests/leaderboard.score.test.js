const request = require('supertest');
const app = require('../src/app').default;

describe('POST /leaderboard/testgame/score', () => {
  it('should require authentication', async () => {
    const res = await request(app).post('/leaderboard/testgame/score').send({ score: 100 });
    expect(res.statusCode).toBe(401);
  });
});
