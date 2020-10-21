export default (word: any) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
