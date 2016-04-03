/// <reference path="../../../typings/require.d.ts" />

let data = {};
class Model implements IModel {
  load(type: string): Data {
    console.log("load", arguments, data[type]);
    return data[type];
  }
  store(type: string, datum: Data) {
    console.log("store", arguments);
    data[type] = datum;
  }
}
let model = new Model();
export = model;
