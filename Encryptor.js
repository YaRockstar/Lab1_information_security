import { Alphabet } from './Alphabet.js';

export class Encryptor {
  constructor(lang) {
    this.lang = lang;
    if (lang === 'russian') {
      this.alphabet = [...Alphabet.russian, ...Alphabet.digits];
    }

    if (lang === 'english') {
      this.alphabet = [...Alphabet.english, ...Alphabet.digits];
    }
  }

  // Метод, шифрующий слово по целочисленному ключу.
  encrypt(word, key) {
    key = this.shortenKey(key);
    return word
      .split('')
      .map(symbol => {
        let index = this.alphabet.indexOf(symbol);
        if (index + key >= this.alphabet.length) {
          index = (index + key) % this.alphabet.length;
          return this.alphabet[index];
        }
        return this.alphabet[index + key];
      })
      .join('');
  }

  // Метод, расшифровывающий слово по целочисленному ключу.
  decrypt(word, key) {
    key = this.shortenKey(key);
    return word
      .split('')
      .map(symbol => {
        let index = this.alphabet.indexOf(symbol);
        if (index - key < 0) {
          index = this.alphabet.length - (key - index);
          return this.alphabet[index];
        }
        return this.alphabet[index - key];
      })
      .join('');
  }

  // Укорачивает ключ (если он отрицательный,
  // то еще к тому же делает его положительным).
  shortenKey(key) {
    key = BigInt(key);
    const len = BigInt(this.alphabet.length);
    if (key >= 0) {
      while (key >= len) {
        key %= len;
      }
    } else {
      while (key <= -len) {
        key %= -len;
      }
      key = key < 0 ? len + key : key;
    }
    return Number(key);
  }
}
