export const isError = code => {
  let digit = parseInt(code.toString()[0], 10);

  return digit === 4 || digit === 5;
};

export const unauthorized = code => {
  return code === 401 || code === 403;
};
