import { ITable, Column, Row } from '@/classes';
import { ActionTree } from 'vuex';
import { ACTIONS } from './action-types';
import { MUTATIONS as M } from './mutation-types';

export const actions: ActionTree<ITable, any> = {
  [ACTIONS.createExample] ({commit}) {
    const cols = [
      new Column('Wartość 1'),
      new Column('Wartość 2'),
      new Column('Wartość 3'),
    ];
    const rows = [];
    for (let i = 0; i < 20; i++) {
      const row = new Row(`Wartość #${i + 1}`);
      row.addField(cols[0].value, 100 + Math.random() * 50);
      row.addField(cols[1].value, 400 + Math.random() * 120);
      row.addField(cols[2].value, 8 + Math.random() * 8);
      rows.push(row);
    }
    commit(M.setTable, 'Nazwa');
    commit(M.setColumns, cols);
    commit(M.setRows, rows);
  },

  [ACTIONS.loadFromCsv] ({commit}, { headers, rows}) {
    const objectsName = headers.shift();
    const headerToColumnMapper = (header: string) => new Column(header);
    const cols = headers.map(headerToColumnMapper);
    const rowsMapper = (values: string[]) => {
      const row = new Row(values.shift());
      values.forEach((value, i) => {
        try {
          const parsedValue = parseFloat(value);
          if (isNaN(parsedValue)) throw false;
          row.addField(cols[i].value, parsedValue);
        } catch {
          throw new Error('Nieprawidłowe wartości w pliku');
        }
      });
      return row;
    }
    const processedRows = rows.map(rowsMapper);
    commit(M.setTable, objectsName);
    commit(M.setColumns, cols);
    commit(M.setRows, processedRows);
  }
}