import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private columnRepository: Repository<Column>,
  ) {}

  /**
   * Add new column in db
   * @param  createColumnDto - new column
   * @param  boardId - board Id
   * @returns created column  Promise(Column)
   */
  async createColumn(
    createColumnDto: CreateColumnDto,
    boardId: string,
  ): Promise<Column> {
    return await this.columnRepository.save({
      ...createColumnDto,
      boardId: boardId,
    });
  }

  /**
   * Get all column by board id
   * @param boardId - board id (string)
   * @returns  all columns Promise(Column[])
   */
  async getAllColumnsByBoardId(boardId: string): Promise<Column[]> {
    return await this.columnRepository.find({ where: { boardId: boardId } });
  }

  /**
   * Get column by boardId and columnId
   * @param  boardId - board id (string)
   * @param  columnId - column id (string)
   * @returns column Promise(Column)
   */
  async getColumnByBoardIdAndColumnId(
    boardId: string,
    columnId: string,
  ): Promise<Column> {
    const column: Column | undefined = await this.columnRepository.findOne({
      where: { id: columnId, boardId: boardId },
    });
    if (!column) {
      throw new NotFoundException();
    }
    return column;
  }

  /**
   * Update column
   * @param updatedColumn - new column data (Column)
   * @param columnId - column id (string)
   * @returns new column data Promise(Column)
   */
  async updateColumn(
    updatedColumn: UpdateColumnDto,
    columnId: string,
  ): Promise<Column> {
    const result: UpdateResult = await this.columnRepository
      .createQueryBuilder()
      .update(Column)
      .set(updatedColumn)
      .where({ id: columnId })
      .returning('*')
      .execute();

    if (result.affected) {
      return result.raw[0] as Column;
    }
    throw new NotFoundException();
  }

  /**
   * Delete column by boardId and columnId
   * @param  columnId  - column id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  async deleteColumn(columnId: string): Promise<void> {
    const result: DeleteResult = await this.columnRepository.delete({
      id: columnId,
    });
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
