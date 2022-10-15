import classcat from 'classcat';
import { ReactElement } from 'react';

interface ButtonProps{
    onClick: (() => void) | ((_cb : () => void) => void);
    children: ReactElement | string;
    className: string;
    isPrimary? : boolean;
    isSecondary? : boolean;
    isFilled? : boolean;
}

export default function Button(props : Partial<ButtonProps>) {
  const {
    children = 'button', onClick = () => {}, className = '', isPrimary = false, isSecondary = false, isFilled = false,
  } = props;

  const buttonClassname = classcat([{
    'flex flex-1 items-center justify-center bg-blue-600 py-2 text-white hover:bg-blue-700': isFilled && isPrimary,
    'flex flex-1 items-center justify-center bg-orange-600 py-2 text-white hover:bg-orange-700': isFilled && isSecondary,
    'flex flex-1 items-center justify-center border border-blue-200 bg-white py-2 text-blue-500 hover:border-blue-200 hover:bg-blue-200 hover:text-blue-600': !isFilled && isPrimary,
    'flex flex-1 items-center justify-center border border-orange-200 bg-white py-2 text-orange-500 hover:border-orange-200 hover:bg-orange-200 hover:text-orange-600': !isFilled && isSecondary,
  }, className]);

  return (
    <button type="button" onClick={(_any? : any) => onClick(_any)} className={buttonClassname}>{children}</button>
  );
}
