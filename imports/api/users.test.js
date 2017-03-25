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

    if (res !== 20) {
      throw new Error('Function did not return the expected value');
    }
  });

  it('should return double of a single number', function() {
    const res = add(11);

    if (res !== 22) {
      throw new Error('Function add did not return the expected value');
    }
  });
});

describe('square function', function() {
  it('should return the square of a number', function() {
    const res = square(10);
  
    if (res !==100) {
      throw new Error('Function did not return the expected value');
    }
  });
});
