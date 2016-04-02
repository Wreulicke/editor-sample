/// <reference path="../typings/require.d.ts" />
/// <reference path="../typings/browser.d.ts" />
require("expose?jQuery!jquery");
require("expose?bootstrap!bootstrap");
require("DataModel/Model");
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
  let router = new VueRouter({
    history: true,
    saveScrollPosition: true
  });
  router.map({
    "/": {
      component: {
        template: "test"
      }
    },
    "/editor/:type": {
      component: require("./component/editor/view").View,
    },
    "/memo": {
      component: require("./component/editor/view").View,
    },
    "/mermaid": {
      component: require("./component/mermaid-editor/view").View
    },
    "/code": {
      component: require("./component/code-editor/view").View
    },
    "/markdown": {
      component: require("./component/markdown-editor/view").View
    }
  });

  let socket = io.connect("http://localhost:3000");
  let eventRegister = EventRegister((new EventDef()).Events, socket);
  socket.on("server message", function() {
    console.log("test");
  });
  router.start(App, "#content");
  router.go("/");
});
