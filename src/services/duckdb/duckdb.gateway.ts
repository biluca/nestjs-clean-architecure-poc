import { GenericGateway } from 'src/commons/gateway.generic';
import { Event } from 'src/modules/events/domain/models/event.model';

export class DuckDBGateway extends GenericGateway {
  constructor() {
    super();
  }

  private createTable(): void {}

  public getAll(): Promise<Array<Event>> {
    throw new Error('Method not implemented.');
  }

  public get(id: number): Promise<Event> {
    throw new Error('Method not implemented.');
  }

  public create(event: Event): Promise<Event> {
    throw new Error('Method not implemented.');
  }

  public delete(id: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
