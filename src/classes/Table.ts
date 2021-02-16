import Column from './Column';
import { Row } from './Row';

export interface ITable {
  columns: Column[];
  rows: Row[];
  objectsName: string;
  minVariantion: number;
}

export class Table implements ITable {
  public columns: Column[];
  private _minVariantionColumns: Column[];
  public rows: Row[];
  public objectsName: string;
  public minVariantion: number;

  constructor() {
    this.objectsName = '';
    this.columns = [];
    this._minVariantionColumns = [];
    this.rows = [];
    this.minVariantion = 20;
  }

  get valueColumns() {
    return this.columns.filter(col => !col.nameColumn)
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
  setMinVariantionColumns() {
    this._minVariantionColumns = this.valueColumns.filter(column => column.variantion(this.rows) > this.minVariantion);
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