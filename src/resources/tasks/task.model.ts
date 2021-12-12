import * as uuid from 'uuid';
/** Class representing a task. */
export class Task {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
  /**
 * Creates an instance of task.
 * @param object -
 * id: string;
  description: string;
  title: string;
  userId: string;
  boardId: string;
  columnId: string;
  order: number;
 */
  constructor({
    id = uuid.v4(),
    title = 'title',
    order = 'order',
    description = 'description',
    userId = 'userId',
    boardId = 'boardId',
    columnId = 'columnId',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
  /**
   * Get from user id, title, order, description,userId
   *
   * @param  task - task to destruct
   * @returns id string, title string, order number|null, description string, userId string
   */
  static toResponse(task: Task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
