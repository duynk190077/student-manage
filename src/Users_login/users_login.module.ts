import { Module } from '@nestjs/common';
import { UsersLoginService } from './users_login.service';
import { UsersLoginController } from './users_login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLoginSchema } from './user_login.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'UserLogin', schema: UserLoginSchema}])
  ],
  providers: [UsersLoginService],
  controllers: [UsersLoginController],
  exports: [UsersLoginService]
})
export class UsersLoginModule {}
