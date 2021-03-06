/// <reference path="../../../typings/browser.d.ts" />
interface Event {
  eventName: string;
  callback: Function;
};
export interface Events extends Array<Event> {
};
export default function(events?: Events, socket?: SocketIOClient.Socket): EventRegister {
  if (events) {
    console.log("regist");
    return new EventRegister().regist(socket, events);
  }
  else
    return new EventRegister();
}
export class EventRegister {
  regist(socket: SocketIOClient.Socket, events: Events): EventRegister {
    events.forEach(function(event: Event) {
      let eventName = event.eventName;
      let callback = event.callback;
      socket.on(eventName, callback);
    });
    return this;
  }
};
