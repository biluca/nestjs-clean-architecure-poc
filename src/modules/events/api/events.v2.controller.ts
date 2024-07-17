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
import { GenericController } from 'src/commons/controller.generic';

@Controller('v2')
export class EventsV2Controller extends GenericController {
  constructor(
    @Inject('EventsRepositoryDuckDBProvider')
    private readonly eventsRepository: EventsRepositoryInterface,
  ) {
    super();
  }

  private eventsRepositoryProcessor = new EventsRepositoryProcessor(
    this.eventsRepository,
  );

  @Get()
  getAll(@Req() req: Request, @Res() res: Response) {
    this.logger.info('Reach the GET /v2/ endpoint on EventsV2Controller');
    const result = this.eventsRepositoryProcessor.getAll();
    return this.resolveResponse(res, result, 200);
  }

  @Get(':id')
  get(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    this.logger.info(`Reach the GET /v2/${id} endpoint on EventsV2Controller`);
    const result = this.eventsRepositoryProcessor.get(id);
    this.resolveResponse(res, result, 200);
  }

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    eventDTO: EventDTO,
  ) {
    this.logger.info('Reach the POST /v2/ endpoint on EventsV2Controller');

    const event = new Event.Builder()
      .withEventGroup(eventDTO.event_group)
      .withEventKey(eventDTO.event_key)
      .withTimestamp(eventDTO.timestamp);

    const result = this.eventsRepositoryProcessor.create(event);
    return this.resolveResponse(res, result, 200);
  }

  @Delete(':id')
  delete(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    this.logger.info(
      `Reach the DELETE /v2/${id} endpoint on EventsV2Controller`,
    );
    const result = this.eventsRepositoryProcessor.delete(id);
    return this.resolveResponse(res, result, 200);
  }
}
