// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const ToggleArrow = (props: IIcon) => {
  return (
    <Icon
      {...props}
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.$toggled ? (
        <>
          <Path
            d="M23.2269 12.2285L12.2109 1.21251"
            stroke="#272E37"
            strokeLinecap="round"
          />
          <Path
            d="M1.19482 12.2285L12.2108 1.21251"
            stroke="#272E37"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <Path
            d="M1.19445 1.21289L12.2104 12.2289"
            stroke="#272E37"
            strokeLinecap="round"
          />
          <Path
            d="M23.2266 1.21289L12.2106 12.2289"
            stroke="#272E37"
            strokeLinecap="round"
          />
        </>
      )}
    </Icon>
  );
};
