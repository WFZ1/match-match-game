export default function fromHyphenToCamelCase(str: string): string {
  return str.replace(/-([a-z0-9])/g, (char) => char[1].toUpperCase());
}
