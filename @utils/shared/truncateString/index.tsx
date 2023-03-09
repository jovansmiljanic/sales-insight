export const truncateString = (string = "", maxLength = 50) => {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}…`
    : string;
};
