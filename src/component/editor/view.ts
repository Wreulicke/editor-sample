/// <reference path="../../../typings/require.d.ts" />
/// <reference path="../../../typings/browser.d.ts"/>
import {IModel} from "../../module/DataModel/Model";
import Component from "vue-class-component";

export interface View extends vuejs.Vue {
  src: string;
  compiled: string;
}
let Model: IModel = window["model"];
@Component({
  template: require("./template")(),
  route: {
    data: function(transition) {
      console.log("route data", arguments);

      let data = Model.load(this.$route.params.type);
      this.$data = data || {
        src: "",
        compiled: ""
      };
    },
    canReuse: function() {
      Model.store(this.$route.params.type, this.$data);
      return true;
    }
  }
})
export class View {
  compile() {
    this.compiled = this.src;
  }
};
