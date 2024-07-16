import { Injectable } from '@nestjs/common';
import { EventsRepositoryInterface } from '../interfaces/events.repository.interface';
import { Event } from '../models/event.model';

@Injectable()
export class EventsRepositoryProcessor {
  constructor(private readonly eventsRepository: EventsRepositoryInterface) {}

  get(id: number) {
    return this.eventsRepository.get(id);
  }

  getAll(): Promise<Array<Event>> {
    return this.eventsRepository.getAll();
  }
  create(event: Event): Promise<Event> {
    return this.eventsRepository.create(event);
  }
  delete(id: number) {
    return this.eventsRepository.delete(id);
  }
}
