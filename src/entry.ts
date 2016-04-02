/// <reference path="../typings/require.d.ts" />
/// <reference path="../typings/browser.d.ts" />
require("expose?jQuery!jquery");
require("expose?bootstrap!bootstrap");
import Component from "vue-class-component";
import Vue = require("vue");
import VueRouter = require("vue-router");
import io = require("socket.io-client");
import EventRegister from "./module/socket/event";
import EventDef from "./module/socket/definition";

import nav = require("./component/nav-bar/view");
Vue.use(VueRouter);
@Component({
  components: {
    "nav-bar": nav.Navigation
  }
})
export class App {
}
Vue.config.debug = true;
document.addEventListener("DOMContentLoaded", function(e) {
  let router = new VueRouter();
  let View = require("./component/editor/view").View;
  router.map({
    "/": {
      component: {
        template: "test"
      }
    },
    "/test": {
      component: View
    }
  });
  router.go("/test");
  let socket = io.connect("http://localhost:3000");
  let eventRegister = EventRegister((new EventDef()).Events, socket);
  socket.on("server message", function() {
    console.log("test");
  });
  router.start(App, "#content");
});
