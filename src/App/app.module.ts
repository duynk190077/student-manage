import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../Users/users.module';
import { TeachersModule } from 'src/Teachers/teachers.module';
import { SubjectsModule } from 'src/Subjects/subjects.module';
import { StudentModule } from 'src/Students/students.module';
import { ParentsModule } from 'src/Parents/parents.module';
import { ClassroomsModule } from 'src/Classrooms/classrooms.module';
import { UsersLoginModule } from 'src/Users_login/users_login.module';
import { TimetablesModule } from 'src/Timetables/timetables.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    TeachersModule,
    SubjectsModule,
    ParentsModule,
    ClassroomsModule,
    StudentModule,
    UsersLoginModule,
    TimetablesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
