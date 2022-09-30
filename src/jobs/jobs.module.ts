import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JobsService } from './jobs.service';

@Module({
  providers: [JobsService, PrismaService],
  exports: [JobsService],
})
export class JobsModule {}
