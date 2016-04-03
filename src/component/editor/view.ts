/// <reference path="../../../typings/require.d.ts" />
/// <reference path="../../../typings/browser.d.ts"/>
import {IModel} from "../../module/DataModel/Model";
import Component from "vue-class-component";
import md from "../../module/markdown/markdown";

export interface View extends vuejs.Vue {
  src: string;
  compiled: string;
  type: string;
}
declare var jQuery: any;
declare var socket: any;
let Model: IModel = window["model"];
@Component({
  template: require("./template")(),
  route: {
    data: function(transition) {
      console.log("route data", arguments);

      let data = Model.load(this.$route.params.type);
      this.$data = data || {
        src: "",
        compiled: "",
        type: this.$route.params.type
      };
    },
    canReuse: function() {
      Model.store(this.$route.params.type, this.$data);
      return true;
    }
  }
})
export class View {
  created() {
    this.$watch("src", function(newVal, oldVal) {
      this.compiled = md.render(newVal);
    }.bind(this));
  }
  $type() {
    return this.$route.params.type;
  }
  compile() {
    this.compiled = md.render(this.src);
  }
  onKeyDown(isCtrl: boolean, keyCode: Number, e) {
    if (isCtrl && keyCode === 83) {
      e.preventDefault();
      console.log(socket);
    }
  }
  insert(e, str: string) {
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return;
    }
  }
};
