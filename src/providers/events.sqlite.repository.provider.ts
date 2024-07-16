import { Injectable } from '@nestjs/common';
import { GenericProvider } from 'src/commons/provider.generic';
import { EventsRepositoryInterface } from 'src/modules/events/domain/interfaces/events.repository.interface';
import { Event } from 'src/modules/events/domain/models/event.model';
import { SQLiteGateway } from 'src/services/sqlite/sqlite.gateway';

@Injectable()
export class EventsRepositorySQLiteProvider
  extends GenericProvider
  implements EventsRepositoryInterface
{
  constructor(private readonly sqLiteManager: SQLiteGateway) {
    super();
  }

  getAll(): Promise<Array<Event>> {
    this.logger.info('Reach getAll() on EventsRepositorySQLiteProvider');
    return this.sqLiteManager.getAll();
  }

  get(id: number): Promise<Event> {
    this.logger.info(`Reach get(${id}) on EventsRepositorySQLiteProvider`);
    return this.sqLiteManager.get(id);
  }

  create(event: Event): Promise<Event> {
    this.logger.info('Reach create() on EventsRepositorySQLiteProvider');
    return this.sqLiteManager.create(event);
  }

  delete(id: number): Promise<number> {
    this.logger.info(`Reach delete(${id}) on EventsRepositorySQLiteProvider`);
    return this.sqLiteManager.delete(id);
  }
}
