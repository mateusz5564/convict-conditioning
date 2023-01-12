// eslint-disable-next-line import/prefer-default-export
export const getHashMessage = (hash: string) => {
  const hashName = hash.substring(0, 8);
  const hashContent = hash.substring(9);

  if (hashName === "#message") {
    return hashContent.replaceAll("+", " ");
  }

  return null;
};
