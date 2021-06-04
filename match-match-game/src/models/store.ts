export default interface Store {
  name: string;
  options: {
    key: string;
    autoIncrement?: boolean;
  };
}
