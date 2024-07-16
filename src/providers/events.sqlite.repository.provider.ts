import { Injectable } from '@nestjs/common';
import { EventsRepositoryInterface } from 'src/modules/events/domain/interfaces/events.repository.interface';
import { Event } from 'src/modules/events/domain/models/event.model';
import { SQLiteGateway } from 'src/services/sqlite/sqlite.gateway';

@Injectable()
export class EventsRepositorySQLiteProvider
  implements EventsRepositoryInterface
{
  private readonly sqLiteManager = new SQLiteGateway();

  get(id: number): Promise<Event> {
    return this.sqLiteManager.get(id);
  }
  getAll(): Promise<Array<Event>> {
    return this.sqLiteManager.getAll();
  }
  create(event: Event): Promise<Event> {
    return this.sqLiteManager.create(event);
  }
  delete(id: number): Promise<number> {
    return this.sqLiteManager.delete(id);
  }
}
