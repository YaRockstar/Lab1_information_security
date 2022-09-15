import { Alphabet } from './Alphabet.js';

export class Validator {
  // Метод, проверяющий является ли символ цифрой.
  static checkDigit(digit) {
    if (Alphabet?.digits) {
      return Alphabet.digits.includes(digit);
    }
    // Если класса Alphabet не существует или не существует его полей,
    // то есть альтернативный вариант.
    const code = `${digit}`.charCodeAt();
    return code >= 48 && code <= 57;
  }

  // Метод, проверяющий является ли число целым.
  static checkIntNumber(number) {
    number = `${number}`;
    if (number[0] === '-') {
      return number
        .substring(1)
        .split('')
        .every(digit => Validator.checkDigit(digit));
    }
    return number.split('').every(digit => Validator.checkDigit(digit));
  }

  // Метод, проверяющий является ли буква английской.
  static checkEnLetter(letter) {
    if (Alphabet?.english) {
      return Alphabet.english.includes(letter);
    }
    // Если класса Alphabet не существует или не существует его полей,
    // то есть альтернативный вариант.
    const code = letter.charCodeAt();
    return code >= 97 && code <= 122;
  }

  // Метод, проверяющий является ли буква русской.
  static checkRusLetter(letter) {
    if (Alphabet?.russian) {
      return Alphabet.russian.includes(letter);
    }
    // Если класса Alphabet не существует или не существует его полей,
    // то есть альтернативный вариант.
    const code = letter.charCodeAt();
    return (code >= 1072 && code <= 1103) || code === 1105;
  }

  // Метод, проверяющий относится ли слово к тому языку,
  // который был передан в качестве аргумента (цифры тоже допускаются).
  static checkWord(word, lang) {
    if (lang === 'english') {
      return word
        .split('')
        .every(
          letter =>
            Validator.checkEnLetter(letter) || Validator.checkDigit(letter)
        );
    }

    if (lang === 'russian') {
      return word
        .split('')
        .every(
          letter =>
            Validator.checkRusLetter(letter) || Validator.checkDigit(letter)
        );
    }
  }
}
