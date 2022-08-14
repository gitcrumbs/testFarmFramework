const { forEach } = require("../index");
const assert = require("assert");

let numbers;

beforeEach(() => {
  numbers = [1, 2, 3];
});

it("should sum an array", () => {
  const numbers = [1, 2, 3];
  let total = 0;

  forEach(numbers, (value) => {
    total += value;
  });
  assert.strictEqual(total, 6);
  numbers.push(3);
  numbers.push(3);
  numbers.push(3);
  numbers.push(3);
});

it("beforeEach is ran each time", () => {
  assert.strictEqual(numbers.length, 3);
});
