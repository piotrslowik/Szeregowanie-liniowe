import { Row } from './Row';

export default class Column {
  public text: string
  public value: string

  constructor(name: string = "Nazwa", value: string = "nazwa") {
    this.text = name;
    this.value = value;
  }

  changeName(name: string) {
    this.text = name;
  }

  average(rows: Row[]): number {
    const sum = rows.reduce((acc, row) => acc += row.values[this.value], 0);
    return sum / rows.length;
  }
}