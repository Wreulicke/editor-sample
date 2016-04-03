declare function require(path: string): any;

interface Data {
  src: string;
  compiled: string;
}
declare interface IModel {
  load(type: string): Data;
  store(type: string, datum: Data);
}
