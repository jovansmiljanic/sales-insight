// Core types
import type { FC } from "react";

// Core
import { createElement } from "react";

// Global types
import { TIconList, IIcon } from "@types";

// Icons
import {
  Filter,
  ToggleArrow,
  ToggleEye,
  Search,
  Copy,
  Twitter,
  Linkedin,
  Facebook,
  Add,
  Remove,
  Language,
} from "@styles/Icons";

type iconOptions = {
  [key in TIconList]: (props: IIcon) => JSX.Element;
};

interface Props extends IIcon {
  $icon: TIconList;
  onClick?: () => void;
}

const Icons: iconOptions = {
  "toggle-arrow": ToggleArrow,
  "toggle-eye": ToggleEye,
  filter: Filter,
  search: Search,
  copy: Copy,
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  add: Add,
  remove: Remove,
  language: Language,
};

const index: FC<Props> = ({ $icon, $color, ...props }) => {
  // Return icon if any
  if ($icon && Icons[$icon])
    return createElement(Icons[$icon], {
      key: $icon as string,
      $color: $color,
      ...props,
    });

  // Return empty JSX
  return <></>;
};

export { index as Icon };
