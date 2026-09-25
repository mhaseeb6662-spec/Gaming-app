import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GameCategoriesService } from './game-categories.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Game Categories')
@Controller()
export class GameCategoriesController {
  constructor(private readonly service: GameCategoriesService) {}

  @Get('api/v1/game-categories')
  @ApiOperation({ summary: 'Get all active game categories' })
  async findAll() {
    return this.service.findAllPublic();
  }

  @Post('api/v1/admin/game-categories')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new game category (Admin)' })
  async create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch('api/v1/admin/game-categories/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update game category (Admin)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete('api/v1/admin/game-categories/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete game category (Admin)' })
  async remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
