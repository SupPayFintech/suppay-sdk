import { createQueryString } from './createQueryString'; // Adjust the path as needed

describe('createQueryString', () => {
  test('should create an empty query string for an empty object', () => {
    expect(createQueryString({})).toBe('');
  });

  test('should create a query string for simple values', () => {
    const params = { name: 'John', age: 30 };
    expect(createQueryString(params)).toBe('name=John&age=30');
  });

  test('should create a query string for arrays', () => {
    const params = { status: ['example1', 'example2', 'example3'] };
    expect(createQueryString(params)).toBe(
      'status%5B%5D=example1&status%5B%5D=example2&status%5B%5D=example3',
    );
  });

  test('should ignore null or undefined values', () => {
    const params = { name: 'John', age: null, city: undefined };
    expect(createQueryString(params)).toBe('name=John');
  });

  test('should handle a mix of arrays and simple values', () => {
    const params = { name: 'John', status: ['active', 'pending'] };
    expect(createQueryString(params)).toBe(
      'name=John&status%5B%5D=active&status%5B%5D=pending',
    );
  });
});
