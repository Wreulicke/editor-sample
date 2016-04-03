let data = {};
interface Data {
  src: string;
  compiled: string;
}
export interface IModel {
  load(type: string): Data;
  store(type: string, datum: Data);
}
export class Model implements IModel {
  load(type: string): Data {
    console.log("load", arguments, data[type]);
    return data[type];
  }
  store(type: string, datum: Data) {
    console.log("store", arguments);
    data[type] = datum;
  }
}
window["model"] = new Model();
