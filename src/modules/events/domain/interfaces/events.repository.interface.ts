import { Event } from '../models/event.model';

export interface EventsRepositoryInterface {
  getAll(): Promise<Array<Event>>;
  get(id: number): Promise<Event>;
  create(event: Event): Promise<Event>;
  delete(id: number): Promise<number>;
}
