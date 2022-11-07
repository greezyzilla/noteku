import { KeyboardEvent, MouseEvent, ReactElement } from 'react';

interface ModalProps{
    children : ReactElement | string;
    onClose() : void;
}

export default function modal(props : ModalProps) {
  const { children, onClose } = props;

  const enterKeyHandle = (event : KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter') {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      tabIndex={0}
      role="button"
      onKeyDown={enterKeyHandle}
      className="absolute left-0 top-0 z-50 flex h-screen w-screen cursor-default items-center justify-center bg-black/10 backdrop-blur-lg"
    >
      <div
        className="cursor-default rounded-lg bg-white dark:bg-slate-900/80"
        onClick={(e : MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
      >
        {children}
      </div>
    </div>
  );
}
