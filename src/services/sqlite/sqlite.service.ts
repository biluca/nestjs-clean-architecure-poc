import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { GenericService } from 'src/commons/service.generic';
import { Event } from 'src/modules/events/domain/models/event.model';

@Injectable()
export class SQLiteService extends GenericService {
  private DB_PATH = 'src/database/sqlite/database.sqlite';

  constructor() {
    super();
    this.createTable();
  }

  private createTable(): void {
    this.logger.info('Reach createTable() on SQLiteService');
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_group TEXT NOT NULL,
        event_key TEXT NOT NULL,
        timestamp DATETIME NOT NULL
      );
    `;
    this.getSQLiteClient().run(sql, (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
      }
    });

    this.getSQLiteClient().close();
  }

  public getSQLiteClient() {
    return new sqlite3.Database(
      this.DB_PATH,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          this.logger.error('Error Opening SQLite Database on SQLiteService');
        }
      },
    );
  }

  public close(): void {
    this.getSQLiteClient().close((err) => {
      if (err) {
        this.logger.error(
          'Error on Closing the Connection to the SQLite Database on SQLiteService',
        );
      } else {
        this.logger.info(
          'Closed the Connection to the SQLite Database on SQLiteService',
        );
      }
    });
  }

  public getAll(): Promise<Array<Event>> {
    this.logger.info('Reach getAll() on SQLiteService');
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM events';
      this.getSQLiteClient().all(sql, (err, rows) => {
        if (err || !rows) {
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
          this.getSQLiteClient().close();
          resolve(events);
        }
      });
    });
  }

  public get(id: number): Promise<Event> {
    this.logger.info(`Reach get(${id}) on SQLiteService`);
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM events WHERE id = ${id}`;

      this.getSQLiteClient().get(sql, (err, row) => {
        if (err || !row) {
          reject('Error retrieving Event');
        } else {
          const event = new Event.Builder()
            .withId(row['id'])
            .withEventGroup(row['event_group'])
            .withEventKey(row['event_key'])
            .withTimestamp(row['timestamp'])
            .build();

          this.getSQLiteClient().close();
          resolve(event);
        }
      });
    });
  }

  public create(event: Event): Promise<Event> {
    this.logger.info('Reach create() on SQLiteService');
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO events (event_group, event_key, timestamp) VALUES (?,?,?);';
      this.getSQLiteClient().run(
        sql,
        [event.event_group, event.event_key, event.timestamp],
        (err) => {
          if (err) {
            reject('Error inserting an Event');
          } else {
            this.getSQLiteClient().close();
            resolve(event);
          }
        },
      );
    });
  }

  public delete(id: number): Promise<number> {
    this.logger.info(`Reach delete(${id}) on SQLiteService`);
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM events WHERE id = ?';
      this.getSQLiteClient().run(sql, [id], (err) => {
        if (err) {
          reject('Error deleting Event');
        } else {
          this.getSQLiteClient().close();
          resolve(id);
        }
      });
    });
  }
}
