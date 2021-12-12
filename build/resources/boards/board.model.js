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
exports.Board = void 0;
const uuid = __importStar(require("uuid"));
const column_model_1 = require("./column.model");
/** Class representing a board. */
class Board {
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
        this.columns = columns.map((column) => new column_model_1.Column(column));
    }
}
exports.Board = Board;
