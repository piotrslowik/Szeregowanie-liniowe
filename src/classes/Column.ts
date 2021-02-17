import { Row } from './Row';

export default class Column {
  public text: string
  public nameColumn: boolean
  public weight: number
  public destimulant: boolean

  constructor(name: string, nameColumn: boolean = false) {
    this.text = name;
    this.nameColumn = nameColumn;
    this.weight = 0;
    this.destimulant = false;
  }

  get value(): string {
    return this.nameColumn
      ? 'name'
      : this.createValue(this.text);
  }
  private createValue(name: string): string {
    const  newName = name
    .trim()
    .replaceAll(/\.|,|\?|\/|\\|;|;|'|"|\[|\]|\{|\}|<|>|!|@|#|\$|%|\^|&|\*|\(|\)| /g, '_')
    .toLowerCase();
    return this.deletePolishChars(newName);
  }
  private deletePolishChars(name: string): string {
    return name
      .replaceAll('ą', 'a')
      .replaceAll('ć', 'c')
      .replaceAll('ę', 'e')
      .replaceAll('ł', 'l')
      .replaceAll('ś', 's')
      .replaceAll('ó', 'o')
      .replaceAll('ż', 'z')
      .replaceAll('ź', 'z')
  }

  changeName(name: string) {
    this.text = name;
  }
  average(rows: Row[]): number {
    const sum = rows.reduce((acc, row) => acc += row.values[this.value], 0);
    return sum / rows.length;
  }
  variance(rows: Row[]): number {
    const average = this.average(rows);
    const sumZ = rows.reduce((acc, row) => acc += Math.pow(average - row.values[this.value], 2), 0);
    return sumZ / rows.length;
  }
  standardDeviation(rows: Row[]): number {
    return Math.sqrt(this.variance(rows));
  }
  getMinValue(rows: Row[]): number {
    const values = rows.map(row => row.values[this.value]);
    return Math.min(...values);
  }
  getMaxValue(rows: Row[]): number {
    const values = rows.map(row => row.values[this.value]);
    return Math.max(...values);
  }
  changeDestimulantToStimulant(rows: Row[]) {
    const max = this.getMaxValue(rows);
    rows.forEach(row => row.values[this.value] = max - row.values[this.value])
  }
  variantion(rows: Row[]) {
    const standardDeviation = this.standardDeviation(rows);
    const average = this.average(rows);
    return (standardDeviation / average) * 100;
  }
}