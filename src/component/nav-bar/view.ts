/// <reference path="../../../typings/require.d.ts" />
let template = require("./template.jade");
import Component from "vue-class-component";

export interface Navigation extends vuejs.Vue { }
@Component({
  template: template()
})
export class Navigation {
  active: Number;
  data() {
    return {
      title: "Editor",
      menus: [
        { title: "markdown" },
        { title: "mermaid" },
        { title: "code" },
        { title: "memo" }
      ],
      active: -1
    };
  }
  $activate(index: Number) {
    this.active = index;
  }
  $deactivate() {
    this.active = -1;
  }
};
