import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Admin - Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('api/v1/admin/users')
export class AdminUsersController {
  constructor(private readonly service: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users with pagination and filters' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'BLOCKED', 'SUSPENDED'] })
  async getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.service.getUsers(Number(page), Number(limit), search, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get complete user profile with wallet and history' })
  async getUserDetails(@Param('id') id: string) {
    return this.service.getUserDetails(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update user status (ACTIVE, BLOCKED, SUSPENDED)' })
  @ApiBody({ schema: { type: 'object', properties: { status: { type: 'string', enum: ['ACTIVE', 'BLOCKED', 'SUSPENDED'] } } } })
  async updateStatus(
    @CurrentUser() admin: any,
    @Param('id') id: string,
    @Body('status') status: any
  ) {
    return this.service.updateStatus(admin.userId, id, status);
  }
}
