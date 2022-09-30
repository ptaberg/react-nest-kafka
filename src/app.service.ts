import { Injectable } from '@nestjs/common';
import { TOPIC_NAME } from './constants';
import { JobsService } from './jobs/jobs.service';
import { ProducerService } from './kafka/producer.service';
import { JobSchema } from './kafka/schemas/email.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly jobsService: JobsService,
  ) {}

  async sendEmails(plan: number) {
    const job = await this.jobsService.create(plan);
    await this.producerService.produce({
      topic: TOPIC_NAME,
      messages: this.generateRandomEmails(plan).map((email) => ({
        value: JobSchema.toBuffer({ email, jobId: job.id }),
      })),
    });
    return { job };
  }

  async getJobStatus(jobId) {
    return await this.jobsService.getJobStatus(jobId);
  }

  async getJob(jobId) {
    return await this.jobsService.getJob(jobId);
  }

  private generateRandomEmails(num: number): string[] {
    const emails = [];
    for (let i = 1; i < num; i++) {
      emails.push(`${i + 1}@fena.co`);
    }
    return emails;
  }
}
