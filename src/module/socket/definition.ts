import {Events} from "./event";
export default class Definition {
  get Events(): Events {
    let events: Events = [
      {
        eventName: "server message",
        callback: function(message) {
          console.log("testa", message);
        }
      }
    ];
    return events;
  }
}
