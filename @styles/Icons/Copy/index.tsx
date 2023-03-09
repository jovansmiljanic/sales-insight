// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const Copy = (props: IIcon) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" {...props}>
      <Path
        d="M9.652,18.459A1.778,1.778,0,0,1,7.88,16.687V4.5A1.682,1.682,0,0,1,8.4,3.271,1.707,1.707,0,0,1,9.652,2.75H19.18a1.682,1.682,0,0,1,1.23.521A1.682,1.682,0,0,1,20.93,4.5V16.687a1.707,1.707,0,0,1-.521,1.252,1.682,1.682,0,0,1-1.23.521Zm0-1.773H19.18V4.5H9.652Zm-3.1,4.852a1.778,1.778,0,0,1-1.75-1.75V6.539H6.55v13.25H16.942v1.75ZM9.652,4.5v0Z"
        transform="translate(-0.8 0.25)"
      />
    </Icon>
  );
};
