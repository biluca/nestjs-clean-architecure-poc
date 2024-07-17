import { Module } from '@nestjs/common';
import { EventsV1Controller } from './api/events.v1.controller';
import { EventsRepositorySQLiteProvider } from 'src/providers/events.sqlite.repository.provider';
import { SQLiteGateway } from 'src/services/sqlite/sqlite.gateway';
import { EventsV2Controller } from './api/events.v2.controller';
import { EventsRepositoryDuckDBProvider } from 'src/providers/events.duckdb.repository.provider';
import { DuckDBGateway } from 'src/services/duckdb/duckdb.gateway';

@Module({
  imports: [],
  controllers: [EventsV1Controller, EventsV2Controller],
  providers: [
    {
      provide: 'EventsRepositorySQLiteProvider',
      useClass: EventsRepositorySQLiteProvider,
    },
    {
      provide: 'EventsRepositoryDuckDBProvider',
      useClass: EventsRepositoryDuckDBProvider,
    },
    SQLiteGateway,
    DuckDBGateway,
  ],
})
export class EventsModule {}
