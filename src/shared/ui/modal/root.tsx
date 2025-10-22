'use client';

import { createPortal } from 'react-dom';

import { Overlay } from './overlay';
import { useModalStore } from './store';
import { useIsMount } from '~/src/shared/hooks/useIsMount';

export function Root() {
  const { modalContent } = useModalStore();
  const { isMounted } = useIsMount();

  if (!isMounted) return null;

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot || !modalContent) return null;

  return createPortal(<Overlay />, modalRoot);
}
