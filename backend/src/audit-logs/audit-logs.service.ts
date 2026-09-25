import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(private prisma: PrismaService) {}

  async logAction(data: {
    admin_id?: string;
    user_id?: string;
    action: string;
    entity: string;
    entity_id?: string;
    old_value?: any;
    new_value?: any;
    ip_address?: string;
  }) {
    return this.prisma.auditLog.create({
      data: {
        admin_id: data.admin_id,
        user_id: data.user_id,
        action: data.action,
        entity: data.entity,
        entity_id: data.entity_id,
        old_value: data.old_value ? JSON.parse(JSON.stringify(data.old_value)) : null,
        new_value: data.new_value ? JSON.parse(JSON.stringify(data.new_value)) : null,
        ip_address: data.ip_address,
      },
    });
  }

  async getLogs(page = 1, limit = 20, entity?: string, adminId?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (entity) where.entity = entity;
    if (adminId) where.admin_id = adminId;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
