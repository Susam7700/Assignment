const fs = require("fs");
const { fileReader } = require("./app"); // Adjust path as needed

jest.mock("fs");

describe("fileReader function", () => {
  // Case 1: File read successfully (expected to pass)
  it("should return the content of the file", async () => {
    const mockData = "Hello, this is test content!";
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, mockData); // Successful file read
    });

    const result = await fileReader();
    expect(result).toBe(mockData); // This should pass
  });

  // Case 2: File read failure (expected to pass)
  it("should handle an error when file reading fails", async () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error("File not found"), null); // Simulate file read error
    });

    try {
      await fileReader();
    } catch (error) {
      expect(error.message).toBe("File not found"); // This should pass
    }
  });

  // Case 3: Check return type (expected to pass)
  it("should return a string", async () => {
    const mockData = "Sample data";
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, mockData); // Successful file read
    });

    const result = await fileReader();
    expect(typeof result).toBe("string"); // This should pass
  });

  // Case 4: Empty file content (expected to fail)
  it("should return an empty string if the file has no content", async () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, ""); // Simulate empty file content
    });

    const result = await fileReader();
    expect(result).toBe("Non-empty string"); // This is a failure: we're expecting a non-empty string, but it returns an empty string
  });

  // Case 5: Encoding mismatch error (expected to fail)
  it("should throw an error if the encoding is incorrect", async () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      // Force a failure if encoding is not 'utf-8'
      if (encoding !== "utf-8") {
        callback(new Error("Encoding mismatch"), null); // Simulate encoding mismatch error
      } else {
        callback(null, "Valid data");
      }
    });

    try {
      await fileReader();
    } catch (error) {
      // This will fail when encoding is not 'utf-8'
      expect(error.message).toBe("Encoding mismatch");
    }
  });
});
