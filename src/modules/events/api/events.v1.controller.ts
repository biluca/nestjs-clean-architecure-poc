import {
  Controller,
  Get,
  Post,
  Delete,
  Inject,
  Req,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import { EventsRepositoryInterface } from '../domain/interfaces/events.repository.interface';
import { EventsRepositoryProcessor } from '../domain/processors/events.repository.processor';
import { Request, Response } from 'express';
import { EventDTO } from './dto/event.dto.api';
import { Event } from '../domain/models/event.model';

@Controller('v1')
export class EventsV1Controller {
  constructor(
    @Inject('EventsRepositorySQLiteProvider')
    private readonly eventsRepository: EventsRepositoryInterface,
  ) {}

  private eventsRepositoryProcessor = new EventsRepositoryProcessor(
    this.eventsRepository,
  );

  @Get()
  getAll() {
    return this.eventsRepositoryProcessor.getAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.eventsRepositoryProcessor.get(id);
  }

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    eventDTO: EventDTO,
  ) {
    const event = new Event.Builder()
      .withEventGroup(eventDTO.event_group)
      .withEventKey(eventDTO.event_key)
      .withTimestamp(eventDTO.timestamp);

    const result = this.eventsRepositoryProcessor.create(event);

    result
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(error.status).json(error);
      });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.eventsRepositoryProcessor.delete(id);
  }
}
