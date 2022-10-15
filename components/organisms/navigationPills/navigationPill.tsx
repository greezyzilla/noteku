import classcat from 'classcat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface NavigationPillProps{
  children : ReactNode;
  href : string;
}

export default function NavigationPill(props : NavigationPillProps) {
  const { children, href } = props;
  const router = useRouter();
  const active = router.asPath === href;

  const navlinkClassname = classcat({
    'whitespace-nowrap rounded-full px-2 py-1 text-sm hover:ring-4 hover:ring-blue-100 sm:px-4 sm:py-2': true,
    'bg-white/90 text-slate-500 hover:text-slate-600': !active,
    'bg-blue-500 text-white': active,
  });
  return (
    <Link href={href}>
      <a className={navlinkClassname}>
        {children}
      </a>
    </Link>
  );
}
