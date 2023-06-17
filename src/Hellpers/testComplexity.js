const testComplexity = (password) => {
  let charsLen = 0;
  const charsMap = {
    '[a-z]': 26,
    '[A-Z]': 26,
    '[0-9]': 10,
    '[^a-zA-Z0-9 ]': 31,
  };
  for (const [key, value] of Object.entries(charsMap)) {
    const re = new RegExp(key);
    if (re.test(password)) {
      charsLen += value;
    }
  }
  return Math.round(Math.log2(charsLen ** password.length), 2);
};

// console.log(testComplexity('U3rmnzoJF1'));

export default testComplexity;
