import Column from './Column';
import { Row } from './Row';

export interface ITable {
  columns: Column[];
  rows: Row[];
}

export class Table implements ITable {
  public columns: Column[];
  public rows: Row[];

  constructor() {
    this.columns = [new Column('Nazwa', 'name')];
    this.rows = [];
  }

  static setColumns(table: ITable, columns: Column[] = []) {
    table.columns = [new Column('Nazwa', 'name'), ...columns];
  }
  static addColumn(table: ITable, column: Column = new Column()) {
    table.columns.push(column);
  }

  static setRows(table: ITable, rows: Row[] = []) {
    table.rows = rows;
  }
  static addRow(table: ITable, row: Row = new Row()) {
    table.rows.push(row);
  }
  static deleteRow(table: ITable, row: Row) {
    table.rows = table.rows.filter(_row => _row.id !== row.id);
  }
  static editRow(table: ITable, row: Row) {
    const index = table.rows.findIndex(_row => _row.id === row.id)
    table.rows[index] = row;
  }
}