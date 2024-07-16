import { Event } from '../models/event.model';

export interface EventsRepositoryInterface {
  get(id: number): Promise<Event>;
  getAll(): Promise<Array<Event>>;
  create(event: Event): Promise<Event>;
  delete(id: number): Promise<number>;
}
