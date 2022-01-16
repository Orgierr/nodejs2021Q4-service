"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid = __importStar(require("uuid"));
/** Class representing a task. */
class Task {
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
    constructor({ id = uuid.v4(), title = 'title', order = 'order', description = 'description', userId = 'userId', boardId = 'boardId', columnId = 'columnId', } = {}) {
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
    static toResponse(task) {
        const { id, title, order, description, userId } = task;
        return { id, title, order, description, userId };
    }
}
exports.Task = Task;
