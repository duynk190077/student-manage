import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController<Entity> {
  constructor(private entityService: BaseService<Entity>) {}

  @Post()
  async create(@Body() entity: Entity): Promise<boolean> {
    return await this.entityService.create(entity);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Entity> {
    return await this.entityService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Entity[]> {
    return await this.entityService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.entityService.delete(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() entity: Entity,
  ): Promise<boolean> {
    return await this.entityService.updateOne(id, entity);
  }
}
