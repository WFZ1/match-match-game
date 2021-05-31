export default async function getData(url: string): Promise<[]> {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
