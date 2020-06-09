// EXERCISE-1:
// 1) С помощью module fs необходимо:
// создать папку, и 3 файлы любым именем ( предусмотреть папка создавалась если не существует)
// Реалиовать удаление всех файлов в текущей папке( метод unlink)
// cоздать текстовый файлом с любым содержимым и считать содержимое и перенести любой другой файл.
// SOLUTION:

// СПОСОБ-1 (асинхронный)

const fs = require('fs');
const util = require('util');

const folder= 'test';
const files = ['vasia.txt', 'boria.txt', 'petia.txt'];
const content = 'Some content!';

// 1. Создаём папку test:
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

const writeFileAsync = util.promisify(fs.writeFile);
const unlinkAsync = util.promisify(fs.unlink);

async function run() {
  // 2. Создаём три файла vasia.txt, boria.txt, petia.txt:
  const createdFiles = files.forEach(file => writeFileAsync(`${folder}/${file}`, content));
  // 3. Удаляем все файлы в папке test:
  const deletedFiles = files.forEach(file => unlinkAsync(`${folder}/${file}`));
  await Promise.all([createdFiles, deletedFiles]);
}

run();

// 4. Создаём файл text.txt с содержимым 'ololo':
fs.writeFileSync('text.txt', 'ololo');

// 5. Считываем содержимое с text.txt:
const data = fs.readFileSync('text.txt');
console.log(data); // буфер
console.log(String(data)); // строка 'ololo'

// 6. Переносим (копируем) содержимое data с text.txt в text-copy.txt:
fs.writeFileSync('text-copy.txt', data);

// // СПОСОБ-2 (синхронный)

// const fs = require('fs');

// const folder= 'test';
// const files = ['vasia.txt', 'boria.txt', 'petia.txt'];
// const content = 'Some content!';

// // 1. Создаём папку test:
// if (!fs.existsSync(folder)) {
//   fs.mkdirSync(folder);
// } 

// // 2. Создаём три файла vasia.txt, boria.txt, petia.txt:
// files.forEach(file => fs.writeFileSync(`${folder}/${file}`, content)); 

// // 3. Удаляем все файлы в папке test:
// files.forEach(file => fs.unlinkSync(`${folder}/${file}`)); 

// // 4. Создаём файл text.txt с содержимым 'ololo':
// fs.writeFileSync('text.txt', 'ololo');

// // 5. Считываем содержимое с text.txt:
// const data = fs.readFileSync('text.txt');
// console.log(data); // буфер
// console.log(String(data)); // строка 'ololo'

// // 6. Переносим (копируем) содержимое data с text.txt в text-copy.txt:
// fs.writeFileSync('text-copy.txt', data);