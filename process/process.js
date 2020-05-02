const parser = require("../parser/parser");

// convertCSVToObjs
function convertCSVToObjs(datas) {
  let objs = [];
  if (data.length == 0) {
    return objs;
  }

  // first elements are name
  let names = datas.shift();

  for (data of datas) {
    let obj = {};
    for (let i = 0; i < names.length; i++) {
      obj[names[i]] = data[i];
    }
    objs.push(obj);
  }
  return objs;
}

function convertCSVToJSON(data) {
  let arrofarrays = parser.processCSV(data);
  let arrofObjs = convertCSVToObjs(arrofarrays);
  return JSON.stringify(arrofObjs);
}

module.exports.convertCSVToJSON = convertCSVToJSON;
