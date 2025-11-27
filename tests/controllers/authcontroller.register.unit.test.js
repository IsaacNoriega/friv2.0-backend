const AuthController = require('../../src/controllers/AuthController').default;

function mockRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe('AuthController.register', () => {
  it('should return 400 if missing fields', async () => {
    const req = { body: {} };
    const res = mockRes();
    await AuthController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
  });
});
