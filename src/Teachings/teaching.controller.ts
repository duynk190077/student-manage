import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { hasRole } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BaseController } from 'src/base/base.controller';
import { Teaching } from './teaching.model';
import { TeachingService } from './teaching.service';

@Controller('teachings')
@UseGuards(JwtAuthGuard)
@hasRole('Admin')
export class TeachingController extends BaseController<Teaching> {
  constructor(private readonly teachingSercive: TeachingService) {
    super(teachingSercive);
  }

  @Get(':class')
  async teachingofClass(@Param('class') className: string): Promise<Teaching> {
    return await this.teachingSercive.teachingofClass(className);
  }
}
