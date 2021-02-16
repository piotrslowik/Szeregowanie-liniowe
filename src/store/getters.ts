import { Column, Table, Row } from '@/classes';
import { GetterTree } from 'vuex';

export const getters: GetterTree<Table, any> = {
  isTableInited: (state: Table): boolean => state.objectsName !== '',
  columns: (state: Table): Column[] => state.columns,
  valueColumns: (state: Table): Column[] => state.columns.filter(col => !col.nameColumn),
  rows: (state: Table): Row[] => state.rows,
  columnsWeightsSum: (state: Table): number => state.columns.filter(col => !col.nameColumn).reduce((acc, col) => acc += col.weight, 0),
  minVariantion: (state: Table): number => state.minVariantion,
}