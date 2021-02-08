import { Table, Column, Row } from '@/classes';
import { MutationTree } from 'vuex';
import { MUTATIONS } from './mutation-types';

export const mutations: MutationTree<Table> = {
  [MUTATIONS.setColumns]: (state: Table, cols: Column[]): any => {
    state.setColumns(cols);
  },
  [MUTATIONS.addColumn]: (state: Table, col: Column): void => {
    state.addColumn(col);
  },
  [MUTATIONS.setRows]: (state: Table, rows: Row[]): void => {
    state.setRows(rows);
  },
  [MUTATIONS.addRow]: (state: Table, row: Row): void => {
    state.addRow(row);
  },
  [MUTATIONS.deleteRow]: (state: Table, row: Row): void => {
    state.deleteRow(row);
  },
  [MUTATIONS.editRow]: (state: Table, row: Row): void => {
    state.editRow(row);
  },
  [MUTATIONS.addField]: (state: Table, value: string): void => {
    state.rows.forEach(row => row.addField(value, 0));
  },
}