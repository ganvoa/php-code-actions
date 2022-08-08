export default class EditorPreferences {
  readonly indentation: string;
  readonly breakLine: string;

  constructor(indentation: string, breakLine: string) {
    this.indentation = indentation;
    this.breakLine = breakLine;
  }
}
