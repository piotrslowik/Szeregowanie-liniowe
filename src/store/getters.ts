import { Column, ITable, Row } from '@/classes';
import { GetterTree } from 'vuex';

export const getters: GetterTree<ITable, any> = {
  columns: (state): Column[] => state.columns,
  valueColumns: (state): Column[] => state.columns.filter(col => col.value !== 'name'),
  rows: (state): Row[] => state.rows,
}