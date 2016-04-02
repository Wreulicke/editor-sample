/// <reference path="../../../typings/require.d.ts" />
/// <reference path="../../../typings/browser.d.ts"/>

import Component from "vue-class-component";

export interface View extends vuejs.Vue {
  src: string;
  compiled: string;
}
@Component({
  template: require("./template")()
})
export class View {
  data() {
    return {
      src: "",
      compiled: ""
    };
  }
  created() {
    console.log("hoge");
  }
  compile() {
    console.log("hoge");
    this.compiled = this.src;
  }
};
