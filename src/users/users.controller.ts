import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Roles('soldier', 'commander')
  async getProfile(@Request() req) {
    return this.usersService.findOneById(req.user.userId);
  }

  @Get()
  @Roles('commander')
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
