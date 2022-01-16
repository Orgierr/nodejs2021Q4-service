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
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const boards_1 = require("./boards");
const columns_1 = require("./columns");
const users_1 = require("./users");
let Task = class Task {
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
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "columnId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => columns_1.Column, (column) => column.task),
    __metadata("design:type", columns_1.Column)
], Task.prototype, "column", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_1.User, (user) => user.task, { onDelete: 'SET NULL' }),
    __metadata("design:type", users_1.User)
], Task.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => boards_1.Board, (board) => board.task, { onDelete: 'CASCADE' }),
    __metadata("design:type", boards_1.Board)
], Task.prototype, "board", void 0);
Task = __decorate([
    (0, typeorm_1.Entity)({ name: 'tasks' })
], Task);
exports.Task = Task;
//# sourceMappingURL=tasks.js.map