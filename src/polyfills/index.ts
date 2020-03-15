/* eslint-disable no-extend-native */
// @ts-ignore
interface IObjectArray<T> {
  [id: string]: T;
}
interface Array<T extends {}> {
  toObject: (idKey: keyof T) => IObjectArray<T>;
}
Array.prototype.toObject = function <T>(idKey: keyof T) {
  return this.reduce(function(prev, value) {
    const id = value[idKey];
    prev[id] = value;
    return prev;
  }, {} as IObjectArray<T>) as IObjectArray<T>;
};
