class CharacterStream {
  constructor(str = "") {
    this.i = 0;
    this.row = 0;
    this.col = 0;

    this.value = str;
  }

  // what could be next
  peek() {
    return this.value.charAt(this.i);
  }

  // Is next character there
  hasNext() {
    return !this.isEOF();
  }

  // what's next
  // aka character
  next() {
     let value = this.value.charAt(this.i++);
     if (value == '\n'){
      this.col = 0
      this.row++
     }else{
      this.col++
     }
     return value
  }

  // reached eof or not
  isEOF() {
    return this.i >= this.value.length;
  }

  // do the regex match
  match(rexp) {
    return rexp.test(this.value.substring(this.i));
  }

  // throw error
  error(msg) {
    throw new Error(`${msg} at row: ${this.row + 1} col:${this.col + 1} `);
  }

}

module.exports.CharacterStream = CharacterStream