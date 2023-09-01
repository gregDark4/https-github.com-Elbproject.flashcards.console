const prompt = require('prompt');
const colors = require('@colors/colors/safe');
const fs = require('fs');

prompt.message = colors.rainbow('<Questions!');
prompt.delimiter = colors.green('>');

class View {
  constructor(obj) {
    this.thems = fs.readFileSync('./topics/thems.txt', 'utf-8').split('\n');
    this.q1 = fs.readFileSync('./topics/q.txt', 'utf-8').split('\n');
    this.q2 = fs.readFileSync('./topics/raccoon_flashcard_data.txt', 'utf-8').split('\n');
    this.cash = 0;
    this.i = 0;
    this.obj = obj;
  }

  getFromConsole() {
    prompt.start();

    const schema = {
      properties: {
        theme: {
          description: colors.magenta(`\nВыбери тему:
          1. ${this.thems[0]}
          2. ${this.thems[1]}
          3. ${this.thems[2]}
          4. Выйти
          `),
        },
      },
    };

    prompt.get(schema, (err, result) => {
      switch (result.theme) {
        case '1':
          this.getThem1(this.q1);
          break;
        case '2':
          this.getThem1(this.q2);
          break;
        case '3':
          this.getThem1(this.q3);
          break;
        case '4':
          console.log('Пока!');
          break;
        default:
          console.log('Темы под таким номером нет!');
          this.getFromConsole();
      }
    });

    return '';
  }

  getThem1(arr, i) {
    if (this.i >= arr.length) {
      console.log('wffewf');
      return 'BABABAB';
    }
    const da = {
      properties: {
        q1: {
          description: colors.magenta(`${arr[this.i]}`),
        },
      },
    };

    prompt.get(da, (err, result) => {
      if (result.q1 === arr[this.i]) {
        console.log('GOOOOOOD JOB!!!!!');
        this.cash += 1;
        console.log(`Вы набрали ${this.cash} / $`);
        this.i += 1;
        this.getThem1(arr, this.i);
      } else {
        console.log('Podymoi ESCHEE!!!!');
        this.getThem1(arr, this.i);
      }
    });
  }
}

const add = new View();
add.getFromConsole();

module.exports = View;

// 3 thems
// 5 q
