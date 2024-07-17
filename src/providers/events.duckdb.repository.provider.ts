import { Injectable } from '@nestjs/common';
import { GenericProvider } from 'src/commons/provider.generic';
import { EventsRepositoryInterface } from 'src/modules/events/domain/interfaces/events.repository.interface';
import { Event } from 'src/modules/events/domain/models/event.model';
import { DuckDBGateway } from 'src/services/duckdb/duckdb.gateway';

@Injectable()
export class EventsRepositoryDuckDBProvider
  extends GenericProvider
  implements EventsRepositoryInterface
{
  constructor(private readonly duckDBGateway: DuckDBGateway) {
    super();
  }
  getAll(): Promise<Array<Event>> {
    this.logger.info('Reach getAll() on EventsRepositoryDuckDBProvider');
    return this.duckDBGateway.getAll();
  }
  get(id: number): Promise<Event> {
    this.logger.info(`Reach get(${id}) on EventsRepositoryDuckDBProvider`);
    return this.duckDBGateway.get(id);
  }
  create(event: Event): Promise<Event> {
    this.logger.info('Reach create() on EventsRepositoryDuckDBProvider');
    return this.duckDBGateway.create(event);
  }
  delete(id: number): Promise<number> {
    this.logger.info(`Reach delete(${id}) on EventsRepositoryDuckDBProvider`);
    return this.duckDBGateway.delete(id);
  }
}
