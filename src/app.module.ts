import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailConsumer } from './EmailConsumer';
import { KafkaModule } from './kafka/kafka.module';
import { JobsModule } from './jobs/jobs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    KafkaModule,
    JobsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailConsumer],
})
export class AppModule {}
