import THESAURUS from './thesaurus';

const USELESS = ['the', 'a', 'some'];

const range = max => [...(function*(i = 0) { while (i < max) yield i++; })()]

export default class Matcher {
  #options: string[];

  constructor(options: string[]) {
    this.#options = options;
  }

  match(input: string): number {
    const words = input
      .trim()
      .split(/\s+/)
      .map((word) => word.toLowerCase())
      .filter(word => !USELESS.includes(word));
    if (!words.length) { return -1; }
    if (!THESAURUS.group(words[0])) { return -1; }
    const pattern: Set<string>[] = [];
    for (let i = 0, j = 1; i < words.length; i = j, j = i + 1) {
      const group = THESAURUS.group(words[i]);
      if (!group) {
        pattern.push(words[i]);
        continue;
      }
      while (j < words.length && group.has(words.slice(i, j + 1).join(' '))) ++j;
      pattern.push(group);
    }
    const index = this.#options
      .map(option => option.toLowerCase().split(/\s+/))
      .map(words => words.map(word => THESAURUS.group(word) || word))
      .findIndex(groups => range(Math.max(groups.length, pattern.length))
        .every(i => groups[i] === pattern[i]));
    return index;
  }
}
