export const truncateString = (string = "", maxLength = 26) => {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}…`
    : string;
};
