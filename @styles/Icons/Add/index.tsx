// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const Add = (props: IIcon) => {
  return (
    <Icon viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M16 4C22.6 4 28 9.4 28 16C28 22.6 22.6 28 16 28C9.4 28 4 22.6 4 16C4 9.4 9.4 4 16 4ZM16 2C8.3 2 2 8.3 2 16C2 23.7 8.3 30 16 30C23.7 30 30 23.7 30 16C30 8.3 23.7 2 16 2Z" />
      <Path d="M24 15H17V8H15V15H8V17H15V24H17V17H24V15Z" />
    </Icon>
  );
};
