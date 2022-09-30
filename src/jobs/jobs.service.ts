import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Job, JobStatus } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(plan: number): Promise<Job> {
    return await this.prismaService.job.create({
      data: {
        sent: 1,
        planned: plan,
      },
    });
  }

  async getJob(jobId: string): Promise<Job> {
    return await this.prismaService.job.findFirst({
      where: { id: jobId },
    });
  }

  async getJobStatus(jobId: string): Promise<any> {
    return await this.prismaService.job.findFirst({
      where: { id: jobId },
      select: {
        sent: true,
        status: true,
      },
    });
  }

  async incrementJobProgress(jobId: string) {
    const { sent, planned } = await this.getJob(jobId);
    if (planned === sent) {
      return;
    }
    const isLastIncrement = sent + 1 === planned;
    await this.prismaService.job.update({
      where: { id: jobId },
      data: {
        sent: {
          increment: 1,
        },
        status: isLastIncrement ? JobStatus.COMPLETE : JobStatus.PROGRESS,
      },
    });
  }
}
