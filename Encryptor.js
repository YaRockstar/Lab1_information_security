import { AlphabetService } from './AlphabetService.js';

export class Encryptor {
  constructor(lang) {
    this.lang = lang;
    this.alphabet = [
      ...AlphabetService.getAlphabet(this.lang),
      ...AlphabetService.digits,
    ];
  }

  // Метод, шифрующий слово по целочисленному ключу.
  encryptWord(word, key) {
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

  // Метод, шифрующий текст по целочисленному ключу.
  encryptText(text, key, separator = ' ') {
    key = this.shortenKey(key);
    return text
      .split(separator)
      .map(word => this.encryptWord(word, key))
      .join(separator);
  }

  // Метод, расшифровывающий слово по целочисленному ключу.
  decryptWord(word, key) {
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

  // Метод, расшифровывающий текст по целочисленному ключу.
  decryptText(text, key, separator = ' ') {
    key = this.shortenKey(key);
    return text
      .split(separator)
      .map(word => this.decryptWord(word, key))
      .join(separator);
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
      key = len + key;
    }
    return Number(key);
  }
}
