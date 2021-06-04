export default interface IStore {
  name: string;
  options: {
    key: string;
    autoIncrement?: boolean;
  };
}
