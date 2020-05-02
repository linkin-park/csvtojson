const http = require("http");
const process = require("./process/process");

http
  .createServer((req, res) => {
    let csvRawData = "";
    if (req.method == "POST") {
      req.on("data", chunk => {
        csvRawData += chunk;
      });
      req.on("end", () => {
        res.setHeader("Content-Type", "application/json");
        res.end(process.convertCSVToJSON(csvRawData));
      });
    } else {
      res.end("Only POST is accepted");
    }
  })
  .listen(1339);
