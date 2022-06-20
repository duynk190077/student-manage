import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { UsersLoginService } from './users_login.service';
import { UserLogin } from './user_login.model';

@Controller('users-login')
export class UsersLoginController extends BaseController<UserLogin> {
  constructor(private readonly userLoginService: UsersLoginService) {
    super(userLoginService);
  }
}
