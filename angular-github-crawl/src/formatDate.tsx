function formatDate(date: string) {
  const yyyy = date.slice(0, 4);
  const mm = date.slice(5, 7);
  const dd = date.slice(8, 10);
  return `${yyyy}.${mm}.${dd}`;
}
export default formatDate;
