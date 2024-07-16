import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
