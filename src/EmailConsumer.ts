import { Injectable, OnModuleInit } from '@nestjs/common';
import { TOPIC_NAME } from './constants';
import { ConsumerService } from './kafka/consumer.service';
import { JobsService } from './jobs/jobs.service';
import { JobSchema } from './kafka/schemas/email.schema';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly jobsService: JobsService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: [TOPIC_NAME], fromBeginning: true },
      {
        partitionsConsumedConcurrently: 3,
        eachMessage: async ({ message }) => {
          const { jobId, email } = JobSchema.fromBuffer(message.value);
          await this.sendEmailToAddress(email, jobId);
          await this.jobsService.incrementJobProgress(jobId);
        },
      },
    );
  }

  private async delay(ms): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async sendEmailToAddress(emailAddress: string, jobId: string) {
    await this.delay(10);
    await console.log(
      `${emailAddress} sent in ${jobId} at ${new Date().toISOString()}`,
    );
  }
}
