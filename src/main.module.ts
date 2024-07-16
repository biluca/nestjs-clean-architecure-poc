import { Module } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [AppModule, EventsModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
