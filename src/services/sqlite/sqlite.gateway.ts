import * as sqlite3 from 'sqlite3';
import { Event } from 'src/modules/events/domain/models/event.model';

export class SQLiteGateway {
  private DB_PATH = 'src/database/sqlite/database.sqlite';
  private database: sqlite3.Database;

  constructor() {
    this.database = new sqlite3.Database(
      this.DB_PATH,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error('Error opening database: ', err.message);
        } else {
          console.log('Connected to the SQLite database.');
          this.createTable();
        }
      },
    );
  }

  private createTable(): void {
    const sql = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_group TEXT NOT NULL,
        event_key TEXT NOT NULL,
        timestamp DATETIME NOT NULL
      );
    `;
    this.database.run(sql, (err) => {
      if (err) {
        console.error('Error creating table: ', err.message);
      } else {
        console.log('Table "events" created or already exists.');
      }
    });
  }

  public getAll(): Promise<Array<Event>> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM events';
      this.database.all(sql, (err, rows) => {
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

          resolve(events);
        }
      });
    });
  }

  public get(id: number): Promise<Event> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM events WHERE id = ${id}`;

      this.database.get(sql, (err, row) => {
        if (err || !row) {
          reject('Error retrieving Event');
        } else {
          const event = new Event.Builder()
            .withId(row['id'])
            .withEventGroup(row['event_group'])
            .withEventKey(row['event_key'])
            .withTimestamp(row['timestamp'])
            .build();
          resolve(event);
        }
      });
    });
  }

  public create(event: Event): Promise<Event> {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO events (event_group, event_key, timestamp) VALUES (?,?,?);';
      this.database.run(
        sql,
        [event.event_group, event.event_key, event.timestamp],
        function (err) {
          if (err) {
            reject('Error inserting an Event');
          } else {
            resolve(event);
          }
        },
      );
    });
  }

  public delete(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM events WHERE id = ?';
      this.database.run(sql, [id], function (err) {
        if (err) {
          reject('Error deleting Event');
        } else {
          resolve(id);
        }
      });
    });
  }
}
