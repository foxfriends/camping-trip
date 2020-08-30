import { λ } from './Keypath';

export default class Matcher {
  constructor(private options: string[]) {}

  match(input: string): number {
    return this.options
      .map(λ.toLowerCase())
      .indexOf(input.toLowerCase());
  }
}
