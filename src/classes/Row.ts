export interface IRowValue {
  [field: string]: number
}

export class Row {
  private static indexer: number = 0
  public values: IRowValue
  public name: string
  public id: number

  constructor(name: string = 'NAZWA') {
    this.values = {};
    this.name = name;
    this.id = Row.indexer;
    Row.indexer++;
  }

  addField(field: string, value: number = 0) {
    this.values[field] = value;
  }

  deleteField(field: string) {
    delete this.values[field];
  }
}
