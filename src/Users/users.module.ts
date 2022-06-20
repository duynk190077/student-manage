import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersLoginModule } from 'src/Users_login/users_login.module';
import { StudentsModule } from 'src/Students/students.module';
import { TeachersModule } from 'src/Teachers/teachers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
    UsersLoginModule,
    StudentsModule,
    TeachersModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
