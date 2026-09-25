import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly service: GamesService) {}

  @Get('api/v1/games')
  @ApiOperation({ summary: 'Get game lobby (with pagination, search, category filter)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.service.findAll(Number(page), Number(limit), search, category);
  }

  @Get('api/v1/games/:id')
  @ApiOperation({ summary: 'Get game details' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post('api/v1/admin/games')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create new game (Admin)' })
  async create(@Body() data: any) {
    return this.service.create(data);
  }

  @Patch('api/v1/admin/games/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update game (Admin)' })
  async update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete('api/v1/admin/games/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete game (Admin)' })
  async remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
