import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
   * @returns created column  Promise(Column)
   */
  createColumn(createColumnDto: CreateColumnDto): Promise<Column> {
    return this.columnRepository.save(createColumnDto);
  }

  /**
   * Get all column by board id
   * @param boardId - board id (string)
   * @returns  all columns Promise(Column[])
   */
  getAllColumnsByBoardId(boardId: string): Promise<Column[]> {
    return this.columnRepository.find({ where: { boardId: boardId } });
  }

  /**
   * Get column by boardId and columnId
   * @param  boardId - board id (string)
   * @param  columnId - column id (string)
   * @returns column Promise(Column | undefined)
   */
  getColumnByBoardIdAndColumnId(
    boardId: string,
    columnId: string,
  ): Promise<Column | undefined> {
    return this.columnRepository.findOne({
      where: { id: columnId, boardId: boardId },
    });
  }

  /**
   * Update column
   * @param updatedColumn - new column data (Column)
   * @param columnId - column id (string)
   * @returns new column data Promise(Column|undefined)
   */
  async updateColumn(
    updatedColumn: UpdateColumnDto,
    columnId: string,
  ): Promise<Column | undefined> {
    const result = await this.columnRepository
      .createQueryBuilder()
      .update(Column)
      .set(updatedColumn)
      .where({ id: columnId })
      .returning('*')
      .execute();

    if (result.affected) {
      return result.raw[0] as Column;
    }
    return undefined;
  }

  /**
   * Delete column by boardId and columnId
   * @param  columnId  - column id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  deleteColumn(columnId: string): Promise<DeleteResult> {
    return this.columnRepository.delete({ id: columnId });
  }
}
