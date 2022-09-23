import { AlphabetService } from './AlphabetService.js';

export class Validator {
  // Метод, проверяющий является ли символ цифрой.
  static checkDigit(digit) {
    return AlphabetService.digits.includes(digit);
  }

  // Метод, проверяющий является ли число целым.
  static checkIntNumber(number) {
    if (number[0] === '-') {
      return number
        .substring(1)
        .split('')
        .every(digit => Validator.checkDigit(digit));
    }
    return number.split('').every(digit => Validator.checkDigit(digit));
  }

  // Метод, проверяющий соответствует ли буква выбранному языку.
  static checkLetter(letter, lang) {
    return AlphabetService.getAlphabet(lang).includes(letter);
  }

  // Метод, проверяющий относится ли слово к выбранному языку.
  static checkWord(word, lang) {
    return word
      .split('')
      .every(
        letter =>
          Validator.checkLetter(letter, lang) || Validator.checkDigit(letter)
      );
  }

  // Метод, проверяющий относится ли текст к тому языку,
  // который был передан в качестве аргумента (цифры тоже допускаются).
  static checkText(text, lang, separator = ' ') {
    return text.split(separator).every(word => Validator.checkWord(word, lang));
  }
}
