import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateJobDto } from './jobs/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/emails')
  async postEmail(@Body() createEmailsJobDto: CreateJobDto) {
    const { plan } = createEmailsJobDto;
    return await this.appService.sendEmails(parseInt(plan, 10));
  }

  @Get('/jobs/status/:jobId')
  async getStatus(@Param('jobId') jobId: string) {
    return await this.appService.getJobStatus(jobId);
  }

  @Get('/jobs/:jobId')
  async getJob(@Param('jobId') jobId: string) {
    return await this.appService.getJob(jobId);
  }
}
