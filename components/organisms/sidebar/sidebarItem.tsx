import classcat from 'classcat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps, ReactElement } from 'react';

interface SidebarItemProps{
    path: string;
    Icon(_props : ComponentProps<'svg'>): ReactElement;
    label: string;
}

export default function SidebarItem(props : SidebarItemProps) {
  const {
    path = '/', Icon, label,
  } = props;

  const router = useRouter();
  const active = router.asPath === path;

  const linkClassname = classcat({
    'group flex items-center gap-2 py-3 px-2 text-sm hover:bg-gradient-to-bl': true,
    'border-r-4 border-blue-500 bg-gradient-to-bl from-blue-100 font-semibold text-slate-500': active,
    'text-slate-500 hover:from-slate-100 hover:text-slate-600': !active,
  });

  const iconClassname = classcat({
    'rounded-sm p-1': true,
    'bg-slate-400 text-white group-hover:bg-slate-500': !active,
    'bg-blue-400 text-white': active,
  });

  return (
    <Link href={path}>
      <a className={linkClassname}>
        <div className={iconClassname}>
          <Icon className="h-4 w-4" />
        </div>
        <p>{label}</p>
      </a>
    </Link>
  );
}
