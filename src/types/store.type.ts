export default interface IStore {
  name: string;
  opts: {
    keyPath: string;
    autoIncrement?: boolean;
  };
}
