import { Table, Column, Row } from '@/classes';
import { MutationTree } from 'vuex';
import { MUTATIONS } from './mutation-types';

interface ISetColumnStimulant {
  column: Column;
  destimulant: boolean;
}
interface ISetColumnWeight {
  column: Column;
  weight: number;
}

export const mutations: MutationTree<Table> = {
  [MUTATIONS.setTable]: (state: Table, objectsName: string): any => {
    state.reset();
    state.initTable(objectsName);
  },
  [MUTATIONS.setColumns]: (state: Table, cols: Column[]): any => {
    state.setColumns(cols);
  },
  [MUTATIONS.setColumnStimulant]: (state: Table, args: ISetColumnStimulant): any => {
    const { column, destimulant } = args;
    const mutatedColumn = state.columns.find(col => col.value === column.value);
    if (mutatedColumn) mutatedColumn.destimulant = destimulant;
  },
  [MUTATIONS.setColumnWeight]: (state: Table, args: ISetColumnWeight): any => {
    const { column, weight } = args;
    const mutatedColumn = state.columns.find(col => col.value === column.value);
    if (mutatedColumn) mutatedColumn.weight = weight;
  },
  [MUTATIONS.addColumn]: (state: Table, col: Column): void => {
    state.addColumn(col);
  },
  [MUTATIONS.setMinVariantionColumns]: (state: Table): void => {
    state.setMinVariantionColumns();
  },
  [MUTATIONS.setRows]: (state: Table, rows: Row[]): void => {
    state.setRows(rows);
  },
  [MUTATIONS.setCalculationRows]: (state: Table): void => {
    state.setCalculationRows();
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
  [MUTATIONS.setMinVariantion]: (state: Table, variantion: number): void => {
    state.minVariantion = variantion;
  },
  [MUTATIONS.changeDestimulantsToStimulants]: (state: Table): void => {
    state.changeDestimulantsToStimulants();
  },
  [MUTATIONS.standardize]: (state: Table): void => {
    state.standardize();
  },
}