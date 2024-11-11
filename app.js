const fs = require("fs");

function fileReader() {
  return new Promise(function (resolve, reject) {
    // Add reject
    fs.readFile("text.txt", "utf-8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function onDone(data) {
  console.log(data);
}

function onError(error) {
  console.error("Error reading file:", error.message);
}

fileReader().then(onDone).catch(onError);

module.exports = {fileReader}
