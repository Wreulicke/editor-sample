/// <reference path="../../../typings/require.d.ts" />
/// <reference path="../../../typings/browser.d.ts"/>
import Component from "vue-class-component";

export interface View extends vuejs.Vue {
  src: string;
  compiled: string;
  type: string;
}
declare var socket: any;
declare var model: IModel;
@Component({
  template: require("./template")(),
  route: {
    deactivate: function() {
      model.store(this.$type(), this.$data);
      return true;
    },
    data: function(transition) {
      let data = model.load(this.$type());
      this.$data = data || {
        src: "",
        compiled: "",
        type: this.$type()
      };
    }
  }
})
export class View {
  created() {
  }
  $type() {
    return this.$route.name;
  }
  compile() {
  }
  onKeyDown(isCtrl: boolean, keyCode: Number, e) {
    if (isCtrl && keyCode === 83) {
      e.preventDefault();
      socket.emit("send file", "test/test.path", this.src);
    }
  }
  insert(e, str: string) {
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
    }
  }
};
