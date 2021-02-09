import Column from './Column';
import { Row } from './Row';

export interface ITable {
  columns: Column[];
  rows: Row[];
  objectsName: string;
}

export class Table implements ITable {
  public columns: Column[];
  public rows: Row[];
  public objectsName: string;

  constructor() {
    this.objectsName = '';
    this.columns = [];
    this.rows = [];
  }
  
  initTable(objectsName: string) {
    this.objectsName = objectsName;
    this.columns = [new Column(objectsName, true)];
  }
  reset() {
    this.objectsName = '';
    this.columns = [];
    this.rows = [];
  }
  setColumns(columns: Column[] = []) {
    this.columns = [new Column(this.objectsName, true), ...columns];
  }
  addColumn(column: Column) {
    this.columns.push(column);
  }
  setRows(rows: Row[] = []) {
    this.rows = rows;
  }
  addRow(row: Row = new Row()) {
    this.rows.push(row);
  }
  deleteRow(row: Row) {
    this.rows = this.rows.filter(_row => _row.id !== row.id);
  }
  editRow(row: Row) {
    const index = this.rows.findIndex(_row => _row.id === row.id);
    const rowsCopy = this.rows.map(val => val);
    rowsCopy[index] = row;
    this.rows = rowsCopy;
  }
}