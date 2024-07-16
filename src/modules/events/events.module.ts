import { Module } from '@nestjs/common';
import { EventsV1Controller } from './api/events.v1.controller';
import { EventsRepositorySQLiteProvider } from 'src/providers/events.sqlite.repository.provider';

@Module({
  imports: [],
  controllers: [EventsV1Controller],
  providers: [
    {
      provide: 'EventsRepositorySQLiteProvider',
      useClass: EventsRepositorySQLiteProvider,
    },
  ],
})
export class EventsModule {}