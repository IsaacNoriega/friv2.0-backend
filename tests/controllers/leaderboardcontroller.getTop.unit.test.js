const LeaderBoardController = require('../../src/controllers/LeaderBoardController').default;

function mockRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

test('LeaderBoardController.getTop existe', () => {
  expect(typeof LeaderBoardController.getTop).toBe('function');
});

