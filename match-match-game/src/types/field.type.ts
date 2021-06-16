export default interface IField {
  title: string;
  type: string;
  name: string;
  pattern: RegExp;
  error: string;
  classes?: string[];
}
