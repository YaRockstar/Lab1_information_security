import { Encryptor } from './Encryptor.js';
import { Validator } from './Validator.js';

// Переменная, которая будет хранить экземпляр класса Encryptor.
let encryptor;

// Верхние кнопки: русский язык, сбросить всё, английский язык.
const ruButton = document.querySelector('.ru-btn');
const enButton = document.querySelector('.en-btn');
const resetButton = document.querySelector('.reset-btn');

// Поля для ввода слова и ключа.
const wordInput = document.querySelector('.input-word');
const keyInput = document.querySelector('.input-key');

// Там будет выводиться зашифрованное и расшифрованное слово.
const encryptedWord = document.querySelector('.encrypted-word');
const decryptedWord = document.querySelector('.decrypted-word');

// Тут будут выводиться ошибки, связанные с отсутствием выбора языка
// и с вводом неправильного слова или ключа.
const langError = document.querySelector('.lang-error');
const wordError = document.querySelector('.word-error');
const keyError = document.querySelector('.key-error');

// Обработка нажатия на кнопку выбора русского языка.
ruButton.addEventListener('click', () => {
  encryptor = new Encryptor('russian');

  ruButton.style.background = 'green';
  enButton.style.background = 'white';

  encryptedWord.textContent = '';
  decryptedWord.textContent = '';

  langError.textContent = '';
  wordError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку выбора английского языка.
enButton.addEventListener('click', () => {
  encryptor = new Encryptor('english');

  enButton.style.background = 'green';
  ruButton.style.background = 'white';

  encryptedWord.textContent = '';
  decryptedWord.textContent = '';

  langError.textContent = '';
  wordError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку сброса.
resetButton.addEventListener('click', () => {
  encryptor = null;

  ruButton.style.background = 'white';
  enButton.style.background = 'white';

  wordInput.value = '';
  keyInput.value = '';

  encryptedWord.textContent = '';
  decryptedWord.textContent = '';

  langError.textContent = '';
  wordError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку шифрования слова по ключу.
document.querySelector('.encrypt-btn').addEventListener('click', () => {
  if (!encryptor) {
    langError.textContent = 'Вы не выбрали язык';
    return;
  }

  const word = wordInput.value;
  if (word === '') {
    wordError.textContent = 'Вы не ввели слово';
    return;
  }

  if (!Validator.checkWord(word, encryptor.lang)) {
    wordError.textContent =
      'Набранные символы не соответствуют символам выбранного алфавита';
    return;
  }

  let key = keyInput.value;
  if (key === '') {
    keyError.textContent = 'Вы не ввели ключ';
    return;
  }

  if (!Validator.checkIntNumber(key)) {
    keyError.textContent = 'Ключ не является целым числом';
    return;
  }

  encryptedWord.textContent = encryptor.encrypt(word, key);
  wordError.textContent = '';
  keyError.textContent = '';
});

// Обработка нажатия на кнопку расшифровки слова по ключу.
document.querySelector('.decrypt-btn').addEventListener('click', () => {
  const word = encryptedWord.textContent;
  if (!encryptor || word === '') {
    wordError.textContent = 'Вы ещё не зашифровали слово';
    return;
  }

  let key = keyInput.value;
  if (key === '') {
    keyError.textContent = 'Вы не ввели ключ';
    return;
  }

  if (!Validator.checkIntNumber(key)) {
    keyError.textContent = 'Ключ не является целым числом';
    return;
  }

  decryptedWord.textContent = encryptor.decrypt(word, key);
  wordError.textContent = '';
  keyError.textContent = '';
});
