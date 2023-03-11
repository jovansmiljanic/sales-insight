// Global styles
import { Icon, Path } from "@styles/Icon";

// Global types
import type { IIcon } from "@types";

export const Edit = (props: IIcon) => {
  return (
    <Icon {...props} viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
      <Path d="M15.045 5C15.423 4.622 15.631 4.12 15.631 3.586C15.631 3.052 15.423 2.55 15.045 2.172L13.459 0.586C13.081 0.208 12.579 0 12.045 0C11.511 0 11.009 0.208 10.632 0.585L0 11.184V15.599H4.413L15.045 5ZM12.045 2L13.632 3.585L12.042 5.169L10.456 3.584L12.045 2ZM2 13.599V12.014L9.04 4.996L10.626 6.582L3.587 13.599H2ZM0 17.599H16V19.599H0V17.599Z" />
    </Icon>
  );
};
