import { Body, Controller, Get, Param } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Teaching } from './teaching.model';
import { TeachingService } from './teaching.service';

@Controller('teachings')
export class TeachingController extends BaseController<Teaching> {
  constructor(private readonly teachingSercive: TeachingService) {
    super(teachingSercive);
  }

  @Get(':class')
  async teachingofClass(@Param('class') className: string): Promise<Teaching> {
    return await this.teachingSercive.teachingofClass(className);
  }
}
