export default class InvalidGroupOffset extends Error {
  constructor(groupIndex: number, matchLength: number) {
    let message = `asked for index ${groupIndex} in a match of length ${matchLength}`;

    super(message);

    this.name = 'InvalidGroupOffset';
    this.stack = (<any>new Error()).stack;
  }
}
