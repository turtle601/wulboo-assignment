import { Close } from '~/src/shared/ui/modal/close';
import { Open } from '~/src/shared/ui/modal/open';
import { Root } from '~/src/shared/ui/modal/root';

export const Modal = {
  Root: Root,
  Open: Open,
  Close: Close,
} as const;
