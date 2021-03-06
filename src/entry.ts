/// <reference path="../typings/require.d.ts" />
/// <reference path="../typings/browser.d.ts" />
require("expose?jQuery!jquery");
require("expose?bootstrap!bootstrap");
require("expose?model!DataModel/Model");
import Component from "vue-class-component";
import Vue = require("vue");
import VueRouter = require("vue-router");
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

let socket = require("expose?socket!./module/socket/socket");
Vue.config.debug = true;
document.addEventListener("DOMContentLoaded", function(e) {
  let router = new VueRouter({
    hashbang: true,
    saveScrollPosition: true
  });

  router.map({
    "/": {
      component: {
        template: "test"
      }
    },
    /*"/editor/:type": {
      component: require("./component/editor/view").View,
    },*/
    "/memo": {
      component: require("./component/editor/view").View,
      name: "memo"
    },
    "/mermaid": {
      component: require("./component/mermaid-editor/view").View,
      name: "mermaid"
    },
    "/code": {
      component: require("./component/code-editor/view").View,
      name: "code"
    },
    "/markdown": {
      component: require("./component/markdown-editor/view").View,
      name: "markdown"
    }
  });
  let eventRegister = EventRegister((new EventDef()).Events, socket);
  socket.on("server message", function() {
    console.log("test", arguments);
  });
  router.start(App, "#content");
  router.go("/");
});
