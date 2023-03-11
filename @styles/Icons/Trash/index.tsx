// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const Trash = (props: IIcon) => {
  return (
    <Icon {...props} viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
      <Path d="M2 18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V6H18V4H14V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H6C5.46957 0 4.96086 0.210714 4.58579 0.585786C4.21071 0.960859 4 1.46957 4 2V4H0V6H2V18ZM6 2H12V4H6V2ZM5 6H14V18H4V6H5Z" />
      <Path d="M6 8H8V16H6V8ZM10 8H12V16H10V8Z" />
    </Icon>
  );
};
