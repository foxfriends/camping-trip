import THESAURUS from './thesaurus';

const USELESS = ['the', 'a', 'some'];

export default class Matcher {
  #options: string[];

  constructor(options: string[]) {
    this.#options = options;
  }

  match(input: string): number {
    const words = input
      .trim()
      .split(/\s+/)
      .filter(word => !USELESS.includes(word));
    if (!words.length) { return -1; }
    if (!THESAURUS.group(words[0])) { return -1; }
    const pattern: Set<string>[] = [];
    for (let i = 0, j = 1; i < words.length; i = j, j = i + 1) {
      const group = THESAURUS.group(words[i]);
      if (!group) { return -1; }
      while (j < words.length && group.has(words.slice(i, ++j).join(' ')));
      pattern.push(group);
    }
    const index = this.#options
      .map(option => option.toLowerCase().split(/\s+/))
      .map(words => words.map(word => THESAURUS.group(word)))
      .findIndex(groups => groups.every((_, i) => groups[i] === pattern[i]));
    return index;
  }
}
