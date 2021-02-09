import { Column, Table, Row } from '@/classes';
import { GetterTree } from 'vuex';

export const getters: GetterTree<Table, any> = {
  columns: (state: Table): Column[] => state.columns,
  valueColumns: (state: Table): Column[] => state.columns.filter(col => !col.nameColumn),
  rows: (state: Table): Row[] => state.rows,
}