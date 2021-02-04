import { Table, ITable, Column, Row } from '@/classes';
import { MutationTree } from 'vuex';
import { MUTATIONS } from './mutation-types';

export const mutations: MutationTree<ITable> = {
  [MUTATIONS.setColumns]: (state: Table, cols: Column[]): void => {
    Table.setColumns(state, cols);
  },
  [MUTATIONS.addColumn]: (state: Table, col: Column): void => {
    Table.addColumn(state, col);
  },
  [MUTATIONS.setRows]: (state: Table, rows: Row[]): void => {
    Table.setRows(state, rows);
  },
  [MUTATIONS.addRow]: (state: Table, row: Row): void => {
    Table.addRow(state, row);
  },
  [MUTATIONS.deleteRow]: (state: Table, row: Row): void => {
    Table.deleteRow(state, row);
  },
  [MUTATIONS.editRow]: (state: Table, row: Row): void => {
    Table.editRow(state, row);
  },
  [MUTATIONS.addField]: (state: Table, value: string): void => {
    state.rows.forEach(row => row.addField(value, 0));
  },
}