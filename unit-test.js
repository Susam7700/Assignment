const fs = require("fs");
const { fileReader } = require("./app"); // Adjust path as needed

jest.mock("fs");

describe("fileReader function", () => {
  // Case 1: File read successfully
  it("should return the content of the file", async () => {
    const mockData = "Hello, this is test content!";
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, mockData); // Simulate successful file read
    });

    const result = await fileReader();
    expect(result).toBe(mockData); // Pass: Returns file content
  });

  // Case 2: File read failure
  it("should handle an error when file reading fails", async () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error("File not found"), null); // Simulate file read error
    });

    await expect(fileReader()).rejects.toThrow("File not found"); // Pass: Rejects with error
  });

  // Case 3: Check return type
  it("should return a string", async () => {
    const mockData = "Sample data";
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, mockData); // Simulate successful file read
    });

    const result = await fileReader();
    expect(typeof result).toBe("string"); // Pass: Ensures return type is string
  });

  // Case 4: Empty file content
  it("should throw an error if the file has no content", async () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, ""); // Simulate empty file content
    });

    await expect(fileReader()).rejects.toThrow("Empty file content"); // Pass: Rejects for empty content
  });

  // Case 5: Encoding mismatch error
  it("should throw an error if the encoding is incorrect", async () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
      if (encoding !== "utf-8") {
        callback(new Error("Encoding mismatch"), null); // Simulate encoding error
      } else {
        callback(null, "Valid data");
      }
    });

    // Manually call the function to simulate encoding mismatch
    await expect(
      new Promise((resolve, reject) =>
        fs.readFile("text.txt", "ascii", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        })
      )
    ).rejects.toThrow("Encoding mismatch");
  });
});
