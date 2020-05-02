const { CharacterStream } = require("./stream");

function processCSV(data) {
  let stream = new CharacterStream(data);
  let result = [];
  let intermResult = [];
  let tempData = "";

  while (stream.hasNext()) {
    let ch = stream.next();

    switch (ch) {
      case ",":
        intermResult.push(tempData);
        tempData = "";
        break;
      case '"':
        tempData = tempData.concat(quotHandle(stream));
        break;
      case "\n":
        intermResult.push(tempData);
        tempData = "";

        result.push(intermResult);
        intermResult = [];
        break;
      case "\r":
        intermResult.push(tempData);
        tempData = "";

        result.push(intermResult);
        intermResult = [];
        break;

      default:
        tempData = tempData.concat(ch);
    }
  }
  // left over on last row
  if (intermResult.length > 0) {
    result.push(intermResult);
    intermResult = [];
  }
  return result;
}

function quotHandle(stream) {
  data = "";

  while (stream.hasNext()) {
    let ch = stream.next();

    switch (ch) {
      case '"':
        //odd case ,"", ==>  ,,
        if (stream.match(/^[ ]*,/) || stream.match(/^[ ]*\n/)) {
          return data;
        } else if (stream.peek() == '"') {
          stream.next();
          data += ch;
        } else {
          stream.error("CSV is invalid for quote handling");
        }
        break;
      default:
        isPrevQuot = false;
        data += ch;
    }
  }
  stream.error("CSV is invalid for quote handling");
}

module.exports.processCSV = processCSV;
