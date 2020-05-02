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

  // left over on last row [EOF reached]
  if (intermResult.length > 0) {
    // last value
    intermResult.push(tempData)
    // add rest of data to result
    result.push(intermResult);
    // free memory
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
