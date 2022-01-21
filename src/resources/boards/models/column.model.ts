import * as uuid from 'uuid';

/** Class representing a column. */
export class Column {
  public id: string;
  public title: string;
  public order: number;
  /**
 * Creates an instance of column.
 * @param object -
 * id: string;
  title: string;
  order: number;
 */
  constructor({ id = uuid.v4(), title = 'string', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
