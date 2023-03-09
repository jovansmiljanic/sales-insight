// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const Linkedin = (props: IIcon) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" {...props}>
      <Path
        d="M3.6,16.106H.266V5.36H3.6ZM1.933,3.894A1.942,1.942,0,1,1,3.865,1.943,1.949,1.949,0,0,1,1.933,3.894ZM16.093,16.106h-3.33V10.875c0-1.247-.025-2.846-1.735-2.846-1.735,0-2,1.355-2,2.756v5.321H5.694V5.36h3.2V6.826h.047A3.507,3.507,0,0,1,12.1,5.09c3.377,0,4,2.224,4,5.113v5.9Z"
        transform="translate(4 3.99)"
      />
    </Icon>
  );
};
