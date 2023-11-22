import { transformErrors } from './error';

describe('transformErrors', () => {
  it('should handle simple fields', () => {
    const backendErrors = {
      username: ['Username is required', 'Username is foo error'],
      password: ['Password is required'],
    };
    const expected = {
      username: 'Username is required',
      password: 'Password is required',
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle nested fields', () => {
    const backendErrors = {
      'user.name': ['Name is required'],
      'user.email': ['Email is invalid'],
    };
    const expected = {
      user: {
        name: 'Name is required',
        email: 'Email is invalid',
      },
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle array fields', () => {
    const backendErrors = {
      'users.0.name': ['First user name is required'],
      'users.1.email': ['Second user email is invalid'],
    };
    const expected = {
      users: [
        { name: 'First user name is required' },
        { email: 'Second user email is invalid' },
      ],
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle mixed array and object fields', () => {
    const backendErrors = {
      'users.0.name': ['First user name is required'],
      'users.1.email': ['Second user email is invalid'],
      'config.theme': ['Theme is required'],
    };
    const expected = {
      users: [
        { name: 'First user name is required' },
        { email: 'Second user email is invalid' },
      ],
      config: {
        theme: 'Theme is required',
      },
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle deeply nested fields', () => {
    const backendErrors = {
      'user.details.address.street': ['Street is required'],
      'user.details.address.zipcode': ['Zipcode is invalid'],
    };
    const expected = {
      user: {
        details: {
          address: {
            street: 'Street is required',
            zipcode: 'Zipcode is invalid',
          },
        },
      },
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle mixed deep array and object fields', () => {
    const backendErrors = {
      'users.0.contacts.emails.0': ['First email is invalid'],
      'users.1.contacts.phones.0': ['First phone number is required'],
    };
    const expected = {
      users: [
        { contacts: { emails: ['First email is invalid'] } },
        { contacts: { phones: ['First phone number is required'] } },
      ],
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle numeric fields in paths', () => {
    const backendErrors = {
      'matrix.0.1': ['Value is required'],
      'matrix.1.0': ['Value is invalid'],
    };
    const expected = {
      matrix: [[undefined, 'Value is required'], ['Value is invalid']],
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle empty or invalid errors', () => {
    const backendErrors = {
      username: [],
      email: null,
    } as any;
    const expected = {
      username: '',
      email: '',
    };
    expect(transformErrors(backendErrors)).toEqual(expected);
  });

  it('should handle no errors', () => {
    const backendErrors = {};
    const expected = {};
    expect(transformErrors(backendErrors)).toEqual(expected);
  });
});
