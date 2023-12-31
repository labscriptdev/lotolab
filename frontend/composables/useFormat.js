export default () => {
  return {
    padStart(n, size = 2, str = "0") {
      return String(n).padStart(size, str);
    },
    padEnd(n, size = 2, str = "0") {
      return String(n).padEnd(size, str);
    },
  };
};
