/// <reference path="../../../typings/require.d.ts" />
/// <reference path="../../../typings/browser.d.ts"/>

import Component from "vue-class-component";
import {View as Base} from "../editor/view";

import md from "../../module/markdown/markdown";

@Component({})
export class View extends Base {
  compile() {
    this.compiled = md.render(this.src);
  }
};
