const prompt = require('prompt');
const player = require('play-sound')((opts = {}));
const colors = require('@colors/colors/safe');
const fs = require('fs');
const View = require('./read.js');

const programmer = new View('life_of_a_programmer.txt');
const wolves = new View('wolf_life.txt');
const calambur = new View('pun.txt');

prompt.message = colors.rainbow('<Questions!');
prompt.delimiter = colors.green('>');

const audio = player.play('./music/sound.mp3', function (err) {
  if (err) throw err;
});

class ViewInConsole {
  constructor() {
    this.cash = 0;
    this.i = 0;
    this.dataProg = programmer.getQuestions();
    this.dataWolves = wolves.getQuestions();
    this.dataCalam = calambur.getQuestions();
  }

  getFromConsole() {
    prompt.start();

    const schema = {
      properties: {
        theme: {
          description: colors.yellow(
            `\nВыбери тему:
          1. 💻 ${'Жизнь программиста'}
          2. 🐺 ${'Волчья жизнь'}
          3. 🤡 ${'Калабурчики'}
          4. 🚪 Завершить игру
          `,
          ),
        },
      },
    };

    prompt.get(schema, (err, result) => {
      switch (result.theme) {
        case '1':
          this.getThem1(this.dataProg);
          break;
        case '2':
          this.getThem1(this.dataWolves);
          break;
        case '3':
          this.getThem1(this.dataCalam);
          break;
        case '4':
          audio.kill();
          break;
        default:
          console.log('❌❌❌ Темы под таким номером нет! ❌❌❌');
          this.getFromConsole();
      }
    });

    return '';
  }

  getThem1(arr, i) {
    if (this.i >= arr.length) {
      console.log('\x1b[34m', 'Пока! 👋👋👋');
      audio.kill();
      console.log(`
      Вы победили, Лорд Людвиг не смог больше выдержать давления ваших слов и понял, 
      что он прогнулся перед вашей мудростью и силой ума. Его глаза заполнились страхом и ужасом, 
      когда он осознал, что его планы разрушены, и его пленница будет возвращена к отцу.
      `);
      return 'BABABAB';
    }
    const da = {
      properties: {
        q1: {
          description: colors.cyan('\x1b[1m', '\x1b[32m', `${arr[this.i].q}\n`),
        },
      },
    };

    prompt.get(da, (err, result) => {
      if (result.q1 === arr[this.i].a) {
        console.log('\x1b[1m', '\x1b[32m', '\n🧠🧠  МОЛОДЕЦ ПОЛУЧАЕТСЯ !!!!! 💋💋\n');
        this.cash += 1;
        console.log('\x1b[1m', '\x1b[32m', `Вы набрали ${this.cash} / ${arr.length}\n`);
        this.i += 1;
        this.getThem1(arr, this.i);
      } else {
        console.log('\x1b[31m', '\n🤦🤷🙊🙊 ЕСЛИ ТЫ ОШИБСЯ, ТО ТЫ ОШИБСЯ!!!! 🙈🙈🤦🤷\n');
        this.getThem1(arr, this.i);
      }
    });
  }
}

const add = new ViewInConsole();
console.log(`
                                 Добро пожаловать в Quiz!
Злой Лорд Людвиг Ван Джаваскриптыч тайно выкрал принцессу Консолю из рук ее отца Короля Бабаяна.
Вы, славный принц, которому доверили спасти юную королеву! Вам удалось проследить за 
Лордом до его жилища и вот, Вы стоите лицом к лицу - готовые сразится в битве умов и победить злодея 
Джаваскриптыча! Для этого Вам предстоит ответить на 5 вопросов по каждой из тем. За каждый правильный 
ответ, ты будешь получать по одному баллу. Ответь верно на все вопросы и спаси прекрасную Консолю.
`);
setTimeout(() => {
  add.getFromConsole();
}, 15000);
