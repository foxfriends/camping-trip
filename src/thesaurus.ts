class Thesaurus {
  #words: { [key: string]: Set<string> } = {};

  addGroup(...words: string[]): this {
    const group = new Set(words);
    for (const word of words) {
      const [prefix] = word.split(/\s+/);
      group.add(prefix);
      this.#words[prefix] = group;
    }
    return this;
  }

  group(word: string): Set<string> | undefined {
    return this.#words[word];
  }
}

export default new Thesaurus()
  .addGroup('no', 'nope', 'n')
  .addGroup('yes', 'yeah', 'ok', 'y')
  .addGroup('move', 'go', 'walk', 'run', 'enter', 'to', 'goto')
  .addGroup('take', 'grab', 'hold', 'pick up')
  .addGroup('look at', 'see', 'view', 'examine');
