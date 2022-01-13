"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const typeorm_1 = require("typeorm");
const boards_1 = require("./boards");
const tasks_1 = require("./tasks");
let Column = class Column {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Column.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Column.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Column.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => boards_1.Board, (board) => board.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", boards_1.Board)
], Column.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tasks_1.Task, (task) => task.column),
    __metadata("design:type", tasks_1.Task)
], Column.prototype, "task", void 0);
Column = __decorate([
    (0, typeorm_1.Entity)({ name: 'columns' })
], Column);
exports.Column = Column;
//# sourceMappingURL=columns.js.map