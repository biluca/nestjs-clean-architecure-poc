import { Injectable } from '@nestjs/common';
import { EventsRepositoryInterface } from '../interfaces/events.repository.interface';
import { Event } from '../models/event.model';
import { GenericProcessor } from 'src/commons/processor.generic';

@Injectable()
export class EventsRepositoryProcessor extends GenericProcessor {
  constructor(private readonly eventsRepository: EventsRepositoryInterface) {
    super();
  }

  getAll(): Promise<Array<Event>> {
    this.logger.info('Reach getAll() on EventsRepositoryProcessor');
    return this.eventsRepository.getAll();
  }

  get(id: number) {
    this.logger.info(`Reach get(${id}) on EventsRepositoryProcessor`);
    return this.eventsRepository.get(id);
  }

  create(event: Event): Promise<Event> {
    this.logger.info('Reach create() on EventsRepositoryProcessor');
    return this.eventsRepository.create(event);
  }
  delete(id: number) {
    this.logger.info(`Reach delete(${id}) on EventsRepositoryProcessor`);
    return this.eventsRepository.delete(id);
  }
}
