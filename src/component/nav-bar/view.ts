/// <reference path="../../../typings/require.d.ts" />
let template = require("./template.jade");
import Component from "vue-class-component";

@Component({
  template: template()
})
export class Navigation {
  data() {
    return {
      title: "hogehoge",
      menus: [
        { title: "markdown" },
        { title: "mermaid" },
        { title: "code" }
      ]
    };
  }
};
