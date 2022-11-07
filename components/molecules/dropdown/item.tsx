import { ComponentProps, ReactElement } from 'react';
import { Button } from '../../atoms';

interface DropdownItemInterface {
  Icon(_props : ComponentProps<'svg'>): ReactElement;
  label:string;
  onClick() : void;
  isLink?: boolean;
  href?: string;
}

export default function DropdownItem(props: Partial<DropdownItemInterface>) {
  const {
    Icon = () => <div />, onClick, isLink = false, href = '/', label,
  } = props;

  return (
    <Button isLink={isLink} href={href} onClick={onClick} className="flex items-center !justify-start gap-3 rounded-sm bg-blue-50 py-2 pl-2 pr-14 hover:bg-blue-100 dark:bg-blue-900/10 dark:hover:bg-blue-900/30">
      <>
        <div className="rounded-sm bg-blue-400 p-1 text-white dark:bg-blue-500 dark:text-slate-900/90">
          <Icon className="h-4 w-4" />
        </div>
        <p className="whitespace-nowrap text-xs dark:text-slate-200">{label}</p>
      </>
    </Button>
  );
}
