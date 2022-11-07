import { useState } from 'react';
import {
  ArchiveBoxIcon, ArrowLeftIcon, CalendarIcon, Squares2X2Icon, StarIcon,
} from '@heroicons/react/24/solid';
import { Button } from '../../atoms';
import DropdownItem from './item';
import { useAppSelector } from '../../../app/hooks';

interface DropdownProps {
  user: {
    name : string;
  },
  onLogout() : void;
}

export default function Dropdown(props : DropdownProps) {
  const { user, onLogout } = props;
  const [isMenuActive, setIsMenuActive] = useState(false);
  const locale = useAppSelector((state) => state.theme.locale);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsMenuActive((prevState) => !prevState)}
        className="h-12 w-12 rounded-full border-2 border-blue-300 bg-blue-100 font-semibold text-slate-600 dark:border-blue-600 dark:bg-blue-900 dark:text-slate-300"
      >
        {user.name[0].toUpperCase()}
      </Button>
      {isMenuActive && (
        <div className="absolute top-10 right-4 z-10 rounded-sm bg-white p-3 text-slate-500 shadow-lg dark:bg-slate-900 dark:shadow-white/5">
          <p className="mb-2 text-xs font-semibold text-slate-400 dark:text-slate-400">MENU</p>
          <div className="flex flex-col gap-2">
            <DropdownItem Icon={Squares2X2Icon} label={locale === 'en' ? 'All Notes' : 'Semua Catatan'} isLink href="/" />
            <DropdownItem Icon={CalendarIcon} label={locale === 'en' ? 'Active' : 'Aktif'} isLink href="/active" />
            <DropdownItem Icon={StarIcon} label={locale === 'en' ? 'Starred' : 'Berbintang'} isLink href="/starred" />
            <DropdownItem Icon={ArchiveBoxIcon} label={locale === 'en' ? 'Archived' : 'Arsip'} isLink href="/archived" />
            <DropdownItem Icon={ArrowLeftIcon} label={locale === 'en' ? 'Logout' : 'Keluar'} onClick={onLogout} />
          </div>
        </div>
      )}
    </div>
  );
}
