const http = require("http");
const csvProcess = require("./process/process");

const PORT = process.env.PORT || 1339

http
  .createServer((req, res) => {
    let csvRawData = "";
    if (req.method === "POST") {
      req.on("data", chunk => {
        csvRawData += chunk;
      });
      req.on("end", () => {
        res.setHeader("Content-Type", "application/json");
        res.end(csvProcess.convertCSVToJSON(csvRawData));
      });
    } else {
      res.end("Only POST is accepted");
    }
  })
  .listen(PORT,()=>console.log(`Listening on port ${PORT}\nReady to accept POST request`));
