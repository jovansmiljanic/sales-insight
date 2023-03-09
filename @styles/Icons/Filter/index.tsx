// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const Filter = (props: IIcon) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 21.267V19.267H8.233V21.267H0ZM0 4.733V2.733H13.767V4.733H0ZM10.233 24V16.5H12.233V19.267H24V21.267H12.233V24H10.233ZM6.233 15.733V13H0V11H6.233V8.2H8.233V15.733H6.233ZM10.233 13V11H24V13H10.233ZM15.766 7.5V0H17.766V2.733H24V4.733H17.767V7.5H15.766Z"
        fill="#222930"
      />
    </Icon>
  );
};
