const fs = require('fs').promises;
const path = require('path');
const { EOL } = require('os');

class View {
  constructor(questions = []) {
    this.questions = questions;
  }

  async getQuestions() {
    const adress = this.model.read();
    const quest = await fs.readFile(
      path.join(__dirname, `./question/${adress}`),
      'utf-8'
    );
    const arr = quest.split(EOL);
    const filtarr = arr.filter((el) => el !== '');
    for (let i = 0; i < filtarr.length; i += 2) {
      this.questions.push({ q: filtarr[i], a: filtarr[i + 1] });
    }
    return this.questions;
  }
}

module.exports = View;
