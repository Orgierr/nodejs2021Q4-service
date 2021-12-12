import * as uuid from 'uuid';
import { Column } from './column.model';

/** Class representing a board. */
export class Board {
  public id: string;
  public title: string;
  public columns: Column[];
  /**
 * Creates an instance of board.
 * @param object -
 * id: string;
  title: string;
  columns: Column[];
 */
  constructor({ id = uuid.v4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => new Column(column));
  }
}
