export default (text: string) => {
  return text.length > 200 ? `${text.slice(0, 199)}...` : text;
};
