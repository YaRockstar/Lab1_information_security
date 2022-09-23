export class AlphabetService {
  static digits = '0123456789'.split('');

  static russian = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');

  static english = 'abcdefghijklmnopqrstuvwxyz'.split('');

  static getAlphabet(lang) {
    if (lang === 'english') {
      return this.english;
    }

    if (lang === 'russian') {
      return this.russian;
    }
  }
}
