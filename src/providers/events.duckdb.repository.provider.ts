import { Injectable } from '@nestjs/common';
import { GenericProvider } from 'src/commons/provider.generic';
import { EventsRepositoryInterface } from 'src/modules/events/domain/interfaces/events.repository.interface';
import { Event } from 'src/modules/events/domain/models/event.model';
import { DuckDBService } from 'src/services/duckdb/duckdb.service';

@Injectable()
export class EventsRepositoryDuckDBProvider
  extends GenericProvider
  implements EventsRepositoryInterface
{
  constructor(private readonly duckDBService: DuckDBService) {
    super();
  }
  getAll(): Promise<Array<Event>> {
    this.logger.info('Reach getAll() on EventsRepositoryDuckDBProvider');
    return this.duckDBService.getAll();
  }
  get(id: number): Promise<Event> {
    this.logger.info(`Reach get(${id}) on EventsRepositoryDuckDBProvider`);
    return this.duckDBService.get(id);
  }
  create(event: Event): Promise<Event> {
    this.logger.info('Reach create() on EventsRepositoryDuckDBProvider');
    return this.duckDBService.create(event);
  }
  delete(id: number): Promise<number> {
    this.logger.info(`Reach delete(${id}) on EventsRepositoryDuckDBProvider`);
    return this.duckDBService.delete(id);
  }
}
