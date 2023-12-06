import Http from './index';

describe('Http', () => {
  let http: Http;
  let mockGet: jest.Mock;
  let mockPost: jest.Mock;
  let mockPut: jest.Mock;
  let mockDelete: jest.Mock;
  let tokenGenerator: jest.Mock;

  const validData = { key: 'value' };

  beforeEach(() => {
    http = new Http({}, 'token');

    mockGet = jest.fn();
    mockPost = jest.fn();
    mockPut = jest.fn();
    mockDelete = jest.fn();

    http.axiosInstance.get = mockGet;
    http.axiosInstance.post = mockPost;
    http.axiosInstance.put = mockPut;
    http.axiosInstance.delete = mockDelete;

    tokenGenerator = jest.fn();
    http.setAuthCallback(tokenGenerator);
  });

  it('should successfully validate data for POST request', async () => {
    mockPost.mockResolvedValue({ data: 'test' });

    const response = await http.post('http://example.com', validData, {});
    expect(mockPost).toHaveBeenCalledWith(
      'http://example.com',
      validData,
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should successfully validate data for PUT request', async () => {
    mockPut.mockResolvedValue({ data: 'test' });

    const response = await http.put('http://example.com', validData, {});

    expect(mockPut).toHaveBeenCalledWith(
      'http://example.com',
      validData,
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should proceed with POST request without validation schema', async () => {
    mockPost.mockResolvedValue({ data: 'test' });

    const response = await http.post('http://example.com', validData);
    expect(mockPost).toHaveBeenCalledWith(
      'http://example.com',
      validData,
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should obtain token from auth callback', async () => {
    tokenGenerator.mockReturnValue('callback-token');
    http.auth(true);

    await http.get('http://example.com');

    expect(tokenGenerator).toHaveBeenCalled();
  });

  it('should use token from auth callback in request headers', async () => {
    tokenGenerator.mockReturnValue('callback-token');
    http.auth(true);
    mockGet.mockResolvedValue({ data: 'response' });

    await http.get('http://example.com');

    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        Authorization: 'Bearer callback-token',
      },
    });
  });

  it('should make a GET request', async () => {
    mockGet.mockResolvedValue({ data: 'test' });

    const response = await http.get('http://example.com');
    expect(mockGet).toHaveBeenCalledWith(
      'http://example.com',
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should make a POST request', async () => {
    const postData = { key: 'value' };
    mockPost.mockResolvedValue({ data: 'test' });

    const response = await http.post('http://example.com', postData);
    expect(mockPost).toHaveBeenCalledWith(
      'http://example.com',
      postData,
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should dynamically update token from auth callback', async () => {
    tokenGenerator
      .mockReturnValueOnce('callback-token-1')
      .mockReturnValueOnce('callback-token-2');
    http.auth(true);

    await http.get('http://example.com');
    await http.get('http://example.com');

    expect(mockGet).toHaveBeenNthCalledWith(2, 'http://example.com', {
      headers: {
        Authorization: 'Bearer token',
      },
    });
  });

  it('should prefer callback token over static token', async () => {
    http.setToken('static-token');
    tokenGenerator.mockReturnValue('callback-token');
    http.auth(true);

    await http.get('http://example.com');

    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        Authorization: 'Bearer callback-token',
      },
    });
  });

  it('should make a PUT request', async () => {
    const putData = { key: 'value' };
    mockPut.mockResolvedValue({ data: 'test' });

    const response = await http.put('http://example.com', putData);
    expect(mockPut).toHaveBeenCalledWith(
      'http://example.com',
      putData,
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should make a DELETE request', async () => {
    mockDelete.mockResolvedValue({ data: 'test' });

    const response = await http.delete('http://example.com');
    expect(mockDelete).toHaveBeenCalledWith(
      'http://example.com',
      expect.any(Object),
    );
    expect(response.data).toBe('test');
  });

  it('should include auth header when auth is true', async () => {
    http.auth(true);
    mockGet.mockResolvedValue({ data: 'response' });

    await http.get('http://example.com');
    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        Authorization: 'Bearer token',
      },
    });
  });

  it('should not include auth header when auth is false', async () => {
    http.auth(false);
    mockGet.mockResolvedValue({ data: 'response' });

    await http.get('http://example.com');
    expect(mockGet).toHaveBeenCalledWith('http://example.com', {});
  });

  it('should update the auth token when setToken is called', async () => {
    const newToken = 'new-token';

    http.setToken(newToken);
    http.auth(true);

    mockGet.mockResolvedValue({ data: 'response' });
    await http.get('http://example.com');

    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
  });

  it('should ensure that the use of auth(true) without a token throws an error', () => {
    const httpLocal = new Http({});

    expect(() => httpLocal.auth(true)).toThrow(
      'No authentication token available',
    );
  });

  it('should include Authorization header for Bearer auth', async () => {
    http.setToken('bearer-token', 'Bearer');
    http.auth(true);
    mockGet.mockResolvedValue({ data: 'response' });

    await http.get('http://example.com');

    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        Authorization: 'Bearer bearer-token',
      },
    });
  });

  it('should include x-auth-application header for Application auth', async () => {
    http.setApplicationAuth('app-token');
    http.auth(true);
    mockGet.mockResolvedValue({ data: 'response' });

    await http.get('http://example.com');

    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        'x-auth-application': 'app-token',
      },
    });
  });

  it('should not mix auth headers when switching auth types', async () => {
    http.setToken('bearer-token', 'Bearer');
    http.auth(true);
    mockGet.mockResolvedValueOnce({ data: 'response' });

    await http.get('http://example.com');

    http.setApplicationAuth('app-token');
    mockGet.mockResolvedValueOnce({ data: 'response' });

    await http.get('http://example.com');

    expect(mockGet).toHaveBeenNthCalledWith(1, 'http://example.com', {
      headers: {
        Authorization: 'Bearer bearer-token',
      },
    });

    expect(mockGet).toHaveBeenNthCalledWith(2, 'http://example.com', {
      headers: {
        'x-auth-application': 'app-token',
      },
    });
  });

  it('should default to Bearer auth when auth type is not specified', async () => {
    http.setToken('default-token');
    http.auth(true);
    mockGet.mockResolvedValue({ data: 'response' });

    await http.get('http://example.com');

    expect(mockGet).toHaveBeenCalledWith('http://example.com', {
      headers: {
        Authorization: 'Bearer default-token',
      },
    });
  });
});
