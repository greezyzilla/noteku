import { ComponentProps, ReactElement } from 'react';
import classcat from 'classcat';

interface NoteActionProps {
    Icon(_props : ComponentProps<'svg'>) : ReactElement;
    label: string;
    isFirst?: boolean;
    isLast?: boolean;
    isActive? : boolean;
    onClick(): void;
}

export default function NoteAction(props : Partial<NoteActionProps>) {
  const {
    Icon, label = 'Label', isFirst = false, isLast = false, isActive = false, onClick = () => {},
  } = props;

  const buttonClassnames = classcat({
    'group flex h-[52px] flex-1 flex-col items-center justify-center gap-[1px] text-sm transition hover:text-white dark:hover:text-blue-900': true,
    'bg-blue-600/10 text-blue-600 hover:bg-blue-500 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-slate-900/80': !isActive,
    'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-500 dark:text-slate-900/90 dark:hover:bg-blue-400 dark:hover:text-slate-900/80': isActive,
    'rounded-bl-md': isFirst,
    'rounded-br-md': isLast,
  });

  return (
    <button type="button" onClick={onClick} className={buttonClassnames}>
      { Icon && <Icon className="h-4 w-4 translate-y-[10px] transition-all group-hover:translate-y-0" /> }
      <p className="text-xs opacity-0 transition-all group-hover:opacity-100">{label}</p>
    </button>
  );
}
