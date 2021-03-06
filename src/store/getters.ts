import { Column, Table, Row } from '@/classes';
import { IChartData } from '@/classes/Table';
import { GetterTree } from 'vuex';

export interface IColumnVariantion {
  text: string;
  value: string;
  variantion: number;
}

export const getters: GetterTree<Table, any> = {
  isTableInited: (state: Table): boolean => state.objectsName !== '',
  columns: (state: Table): Column[] => state.columns,
  valueColumns: (state: Table): Column[] => state.valueColumns,
  rows: (state: Table): Row[] => state.rows,
  columnsWeightsSum: (state: Table): number => state.columns.filter(col => !col.nameColumn).reduce((acc, col) => acc += col.weight, 0),
  minVariantion: (state: Table): number => state.minVariantion,
  variantions: (state: Table): IColumnVariantion[] => state.valueColumns.map(column => ({
    text: column.text,
    value: column.value,
    variantion: column.variantion(state.rows),
  })),
  chartData: (state: Table): IChartData[] => state.chartData,
  chartLabels: (state: Table): string[] => state.chartData.map(val => val.y),
  threeBest: (state: Table): string[] => {
    if (state.chartData.length == 2) return [state.chartData[0].y, state.chartData[1].y];
    else return [state.chartData[0].y, state.chartData[1].y, state.chartData[2].y];
  }
}