export type { User } from "./users";
export type { Customer } from "./customer";
export type { Article, IArticle } from "./article";
export type { Order } from "./order";

export type { Theme, ThemeContext } from "./theme";

export type {
  Breakpoints,
  Alignments,
  Spaces,
  AlignItems,
  JustifyContent,
  FontWeights,
  ColumnSize,
  FontSize,
  Boolean,
  TextAlign,
  PaddingTypes,
  MarginTypes,
  Colors,
} from "./theme/style";

import { Colors } from "./theme/colors";

export type TIconList =
  | "toggle-arrow"
  | "toggle-eye"
  | "filter"
  | "search"
  | "copy"
  | "twitter"
  | "linkedin"
  | "facebook"
  | "add"
  | "remove"
  | "language"
  | "trash"
  | "edit"
  | "preview";

export interface IIcon {
  $size?: 1 | 2 | 3;
  $color?: Colors;
  $toggled?: boolean;
}
