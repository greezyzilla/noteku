import classcat from 'classcat';
import Link from 'next/link';
import { ReactElement } from 'react';

interface ButtonProps{
    onClick: (() => void) | ((_cb : () => void) => void);
    children: ReactElement | string;
    className: string;
    isFilled? : boolean;
    isLink? : boolean;
    href? : string;
}

export default function Button(props : Partial<ButtonProps>) {
  const {
    children, onClick = () => {}, className, isFilled, isLink = false, href = '/',
  } = props;

  const buttonClassname = classcat([{
    'flex flex-1 items-center justify-center font-medium': true,
    'bg-blue-600 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-slate-900 dark:hover:bg-blue-400': isFilled,
    'border border-blue-200 bg-white py-2 text-blue-500 hover:bg-blue-200 hover:text-blue-600 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-blue-800/50 dark:hover:text-blue-300': !isFilled,
  }, className]);

  if (isLink) {
    return (
      <Link href={`${href}`}>
        <a className={buttonClassname}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button type="button" onClick={(_any : any) => onClick(_any)} className={buttonClassname}>{children}</button>
  );
}
