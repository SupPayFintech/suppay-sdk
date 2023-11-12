import Http from "./index";

describe("Http", () => {
  let http: Http;
  let mockGet: jest.Mock;
  let mockPost: jest.Mock;
  let mockPut: jest.Mock;
  let mockDelete: jest.Mock;

  beforeEach(() => {
    http = new Http({}, "token");

    mockGet = jest.fn();
    mockPost = jest.fn();
    mockPut = jest.fn();
    mockDelete = jest.fn();

    http.axiosInstance.get = mockGet;
    http.axiosInstance.post = mockPost;
    http.axiosInstance.put = mockPut;
    http.axiosInstance.delete = mockDelete;
  });

  it("should make a GET request", async () => {
    mockGet.mockResolvedValue({ data: "test" });

    const response = await http.get("http://example.com");
    expect(mockGet).toHaveBeenCalledWith(
      "http://example.com",
      expect.any(Object)
    );
    expect(response.data).toBe("test");
  });

  it("should make a POST request", async () => {
    const postData = { key: "value" };
    mockPost.mockResolvedValue({ data: "test" });

    const response = await http.post("http://example.com", postData);
    expect(mockPost).toHaveBeenCalledWith(
      "http://example.com",
      postData,
      expect.any(Object)
    );
    expect(response.data).toBe("test");
  });

  it("should make a PUT request", async () => {
    const putData = { key: "value" };
    mockPut.mockResolvedValue({ data: "test" });

    const response = await http.put("http://example.com", putData);
    expect(mockPut).toHaveBeenCalledWith(
      "http://example.com",
      putData,
      expect.any(Object)
    );
    expect(response.data).toBe("test");
  });

  it("should make a DELETE request", async () => {
    mockDelete.mockResolvedValue({ data: "test" });

    const response = await http.delete("http://example.com");
    expect(mockDelete).toHaveBeenCalledWith(
      "http://example.com",
      expect.any(Object)
    );
    expect(response.data).toBe("test");
  });

  it("should include auth header when auth is true", async () => {
    http.auth(true);
    mockGet.mockResolvedValue({ data: "response" });

    await http.get("http://example.com");
    expect(mockGet).toHaveBeenCalledWith("http://example.com", {
      headers: {
        Authorization: "Bearer token",
      },
    });
  });

  it("should not include auth header when auth is false", async () => {
    http.auth(false);
    mockGet.mockResolvedValue({ data: "response" });

    await http.get("http://example.com");
    expect(mockGet).toHaveBeenCalledWith("http://example.com", {});
  });

  it("should update the auth token when setToken is called", async () => {
    const newToken = "new-token";

    http.setToken(newToken);
    http.auth(true);

    mockGet.mockResolvedValue({ data: "response" });
    await http.get("http://example.com");

    expect(mockGet).toHaveBeenCalledWith("http://example.com", {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
  });

  it("should ensure that the use of auth(true) without a token throws an error", () => {
    const httpLocal = new Http({});

    expect(() => httpLocal.auth(true)).toThrow(
      "No authentication token available"
    );
  });
});
