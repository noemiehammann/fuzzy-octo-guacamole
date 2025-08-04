const { getDailyProgram } = require('../schedule');

test('program contains activities', () => {
  const program = getDailyProgram();
  expect(program.length).toBeGreaterThan(0);
  expect(program[0]).toHaveProperty('time');
  expect(program[0]).toHaveProperty('activity');
});
