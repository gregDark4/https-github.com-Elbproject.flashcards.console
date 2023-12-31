const fs = require('fs');
const path = require('path');
const { EOL } = require('os');

class View {
  constructor(txt) {
    this.questions = [];
    this.txt = txt;
  }

  getQuestions() {
    const adress = this.txt;
    const quest = fs.readFileSync(path.join(__dirname, `./question/${adress}`), 'utf-8');
    // const arr1 = [];
    const arr = quest.split(EOL);
    const filtarr = arr.filter((el) => el !== '');
    for (let i = 0; i < filtarr.length; i += 2) {
      this.questions.push({ q: filtarr[i], a: filtarr[i + 1] });
    }
    return this.questions;
  }
}

module.exports = View;
