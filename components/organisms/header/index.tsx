import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { signOut } from '../../../features/auth';
import { ToggleDarkMode, ToggleLocale } from '../../molecules';
import Dropdown from '../../molecules/dropdown';
import SearchNote from './searchNote';

export default function Header() {
  const locale = useAppSelector((state) => state.theme.locale);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogout = async () => {
    dispatch(signOut());
    if (locale === 'en') toast.success('Logged out successfully');
    else toast.success('Berhasil keluar');
    router.replace('/auth/login');
  };

  return (
    <header className="flex h-fit w-full bg-white/80 shadow-sm dark:bg-slate-900/80">
      <div className="grid w-full flex-1 grid-cols-12 px-4 sm:px-8">
        <div className="col-span-2 flex items-center py-3">
          <p className="text-3xl font-black">
            <span className="text-blue-500">NOTE</span>
            <span className="text-orange-400 dark:text-orange-500">KU</span>
          </p>
        </div>
        <div className="col-span-10 py-3">
          <div className="flex justify-end gap-4">
            <div className="hidden md:flex">
              <SearchNote hasIcon />
            </div>
            <ToggleLocale />
            <ToggleDarkMode />
            <Dropdown user={{ name: 'Gunawan' }} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
}
