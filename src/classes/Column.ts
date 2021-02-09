import { Row } from './Row';

export default class Column {
  public text: string
  public nameColumn: boolean

  constructor(name: string, nameColumn: boolean = false) {
    this.text = name;
    this.nameColumn = nameColumn;
  }

  get value(): string {
    return this.nameColumn
      ? 'name'
      : this.text
        .trim()
        .replaceAll(/\.|,|\?|\/|\\|;|;|'|"|\[|\]|\{|\}|<|>|!|@|#|\$|%|\^|&|\*|\(|\)| /g, '_')
        .toLowerCase();
  }

  changeName(name: string) {
    this.text = name;
  }
  average(rows: Row[]): number {
    const sum = rows.reduce((acc, row) => acc += row.values[this.value], 0);
    return sum / rows.length;
  }
}