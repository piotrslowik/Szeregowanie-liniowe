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
  standardizeValue(field: string, average: number, standardDeviation: number) {
    this.values[field] = (this.values[field] - average) / standardDeviation;
  }
  weighValue(field: string, weight: number) {
    const percentage = weight / 100;
    this.values[field] *= percentage;
  }
  setQi() {
    const standardizedSum = Object.values(this.values).reduce((acc, value) => acc += value, 0);
    this.addField('qi', standardizedSum);
  }
  setDi(pattern: Row, antipattern: Row) {
    const di = (this.values['qi'] - antipattern.values['qi']) / (pattern.values['qi'] - antipattern.values['qi']);
    this.addField('di', di);
  }
}
