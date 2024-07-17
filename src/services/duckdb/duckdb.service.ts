import { Event } from 'src/modules/events/domain/models/event.model';
import * as duckdb from 'duckdb';
import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/commons/service.generic';

@Injectable()
export class DuckDBService extends GenericService {
  private DB_PATH = 'src/database/duckdb/database.db';
  private database = new duckdb.Database(this.DB_PATH);

  constructor() {
    super();
    this.createSequence();
    this.createTable();
  }

  private getDuckDBClient() {
    return this.database.connect();
  }

  private createTable(): void {
    this.logger.info('Reach createTable() on DuckDBService');
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER DEFAULT nextval('event_id_seq') PRIMARY KEY,
        event_group TEXT NOT NULL,
        event_key TEXT NOT NULL,
        timestamp TIMESTAMP NOT NULL
      );
    `;
    this.getDuckDBClient().run(sql, (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
      }
    });
  }

  private createSequence(): void {
    this.logger.info('Reach createSequence() on DuckDBService');
    const sql = `
      CREATE SEQUENCE IF NOT EXISTS event_id_seq;
    `;
    this.getDuckDBClient().run(sql, (err) => {
      if (err) {
        this.logger.error(`Error creating sequence: ${err.message}`);
      }
    });
  }

  public getAll(): Promise<Array<Event>> {
    this.logger.info('Reach getAll() on DuckDBService');
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM events';
      this.getDuckDBClient().all(sql, (err, rows) => {
        if (err) {
          reject('Error retrieving Events');
        } else {
          const events = [];

          rows.forEach((row) => {
            const event = new Event.Builder()
              .withId(row['id'])
              .withEventGroup(row['event_group'])
              .withEventKey(row['event_key'])
              .withTimestamp(row['timestamp'])
              .build();

            events.push(event);
          });
          resolve(events);
        }
      });
    });
  }

  public get(id: number): Promise<Event> {
    this.logger.info(`Reach get(${id}) on DuckDBService`);
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM events WHERE id = ${id}`;

      this.getDuckDBClient().all(sql, (err, row) => {
        if (err || !row[0]) {
          reject('Error retrieving Event');
        } else {
          const event = new Event.Builder()
            .withId(row[0]['id'])
            .withEventGroup(row[0]['event_group'])
            .withEventKey(row[0]['event_key'])
            .withTimestamp(row[0]['timestamp'])
            .build();

          resolve(event);
        }
      });
    });
  }

  public create(event: Event): Promise<Event> {
    this.logger.info('Reach create() on DuckDBService');
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO events (event_group, event_key, timestamp) VALUES ('${event.event_group}','${event.event_key}','${event.timestamp}');`;
      this.getDuckDBClient().run(sql, (err) => {
        if (err) {
          this.logger.error(`Error inserting an Event: ${err}`);
          reject('Error inserting an Event');
        } else {
          resolve(event);
        }
      });
    });
  }

  public delete(id: number): Promise<number> {
    this.logger.info(`Reach delete(${id}) on DuckDBService`);
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM events WHERE id = ?';
      this.getDuckDBClient().run(sql, [id], (err) => {
        if (err) {
          reject('Error deleting Event');
        } else {
          resolve(id);
        }
      });
    });
  }
}
