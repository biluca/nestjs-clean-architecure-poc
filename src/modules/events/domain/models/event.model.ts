export class Event {
  readonly id: string;
  readonly event_group: string;
  readonly event_key: string;
  readonly timestamp: Date;

  constructor(builder: EventBuilder) {
    this.id = builder.id;
    this.event_group = builder.event_group;
    this.event_key = builder.event_key;
    this.timestamp = builder.timestamp;
  }

  static get Builder() {
    return EventBuilder;
  }
}

class EventBuilder {
  id: string;
  event_group: string;
  event_key: string;
  timestamp: Date;

  withId(id: string): EventBuilder {
    this.id = id;
    return this;
  }

  withEventGroup(event_group: string): EventBuilder {
    this.event_group = event_group;
    return this;
  }

  withEventKey(event_key: string): EventBuilder {
    this.event_key = event_key;
    return this;
  }

  withTimestamp(timestamp: Date): EventBuilder {
    this.timestamp = timestamp;
    return this;
  }

  build(): Event {
    return new Event(this);
  }
}
