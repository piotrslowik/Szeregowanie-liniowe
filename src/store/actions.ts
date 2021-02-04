import { ITable, Column, Row } from '@/classes';
import { ActionTree } from 'vuex';
import { ACTIONS } from './action-types';
import { MUTATIONS as M } from './mutation-types';

export const actions: ActionTree<ITable, any> = {
  [ACTIONS.createExample] ({commit}) {
    const cols = [
      new Column('Wartość 1', 'val1'),
      new Column('Wartość 2', 'val2'),
      new Column('Wartość 3', 'val3'),
    ];
    const rows = [];
    for (let i = 0; i < 20; i++) {
      const row = new Row(`Wartość #${i + 1}`);
      row.addField('val1', 100 + Math.random() * 50);
      row.addField('val2', 400 + Math.random() * 120);
      row.addField('val3', 8 + Math.random() * 8);
      rows.push(row);
    }
    commit(M.setColumns, cols);
    commit(M.setRows, rows);
  },
}