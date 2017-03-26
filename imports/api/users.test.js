import expect from 'expect';

const add = (a, b) =>{
  if (typeof b !== 'number') {
    return a + a;
  }

  return a + b;
};

const square = (a) => a * a;

describe('add function', function() {
  it('should return the sum of two numbers', function() {
    const res = add(11, 9);

    expect(res).toBe(20);
  });

  it('should return double of a single number', function() {
    const res = add(11);

    expect(res).toBe(22);
  });
});

describe('square function', function() {
  it('should return the square of a number', function() {
    const res = square(10);

    expect(res).toBe(100);
  });
});
