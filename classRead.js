const { EOL } = require('os');
const readlineSync = require('readline-sync');

class Model {
  constructor(arr = [1, 2]) {
    this.arr = arr;
  }

  read() {
    const data =
      readlineSync.question(`Добро пожаловать в игру! Выберите тему...${EOL}
        1. Волчья жизнь
        2. Жизнь программиста${EOL}`);
    if (+data === this.arr[0]) {
      return 'life_of_a_programmer.txt';
    }
    if (+data === this.arr[1]) {
      return 'wolf_life.txt';
    }
    return null;
  }
}

module.exports = Model;
