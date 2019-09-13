export enum Suite {
  Clove = '♣',
  Diamond = '♦',
  Heart = '♥',
  Spade = '♠',
  Joker = '?',
  Unknown = '?',
}

function charForValue(value: number): string {
  if (value >= 2 && value <= 10) {
    return `${value}`;
  } else {
    const map: Record<number, string> = {
      0: '?',
      14: 'J',
      1: 'A',
      11: 'J',
      12: 'Q',
      13: 'K',
    };
    return map[value];
  }
}

export class Card {
  static readonly JOKER_VALUE = 14;
  static readonly MYSTERY_VALUE = 0;
  static readonly JACK_VALUE = 11;
  static readonly QUEEN_VALUE = 12;
  static readonly KING_VALUE = 13;
  static readonly MYSTERY: Card = new Card(Suite.Unknown, Card.MYSTERY_VALUE);

  suite: Suite;
  value: number;

  constructor(s: Suite, v: number) {
    this.suite = s;
    this.value = v;
  }

  toStringArray(): string[] {
    const str: string[] = [];
    str.push(` _____ `);
    str.push(`|${this.suite}    |`);
    str.push(
      `| ${this.value === 10 ? ` 10` : ` ${charForValue(this.value)} `} |`
    );
    str.push(`|    ${this.suite}|`);
    str.push(` ‾‾‾‾‾ `);
    return str;
  }

  toString(): string {
    const arr = this.toStringArray;
    let str = '';

    for (const row in arr) {
      if (arr.hasOwnProperty(row)) {
        str += row + '\n';
      }
    }
    return str;
  }
}
