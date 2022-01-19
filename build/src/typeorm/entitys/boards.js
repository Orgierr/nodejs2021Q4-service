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
exports.Board = void 0;
const typeorm_1 = require("typeorm");
const columns_1 = require("./columns");
const tasks_1 = require("./tasks");
const users_1 = require("./users");
let Board = class Board {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => columns_1.Column, (column) => column.board, {
        cascade: true,
        nullable: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_1.User, (user) => user.board),
    __metadata("design:type", users_1.User)
], Board.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tasks_1.Task, (task) => task.board),
    __metadata("design:type", tasks_1.Task)
], Board.prototype, "task", void 0);
Board = __decorate([
    (0, typeorm_1.Entity)({ name: 'boards' })
], Board);
exports.Board = Board;
//# sourceMappingURL=boards.js.map